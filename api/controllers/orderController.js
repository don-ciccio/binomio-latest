const Order = require("../models/order");
const Store = require("../models/store");

const { getAddressCordinates } = require("../utils/location");
const { getDistance, renameKey } = require("../utils/apiFunctions");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Days = require("../models/days");

//route POST /api/v1/checkRadius
exports.checkRadius = catchAsyncErrors(async (req, res, next) => {
    const { orderItems, shippingInfo } = req.body;
    const API_KEY = process.env.GOOGLE_API_KEY;

    if (orderItems && orderItems.length === 0) {
        return next(new ErrorHandler("Cannot create order", 400));
    } else {
        let stores = [];
        let storeId = "";

        orderItems.forEach(async (item) => {
            storeId = item.store;
            stores.push(storeId);
        });
        console.log(orderItems);
        let address = `${shippingInfo.address} ${shippingInfo.postalCode} ${shippingInfo.city} `;

        let location = await getAddressCordinates(address, API_KEY);
        // console.log(location);

        //couldn't determine coordinates
        if (!location.status) {
            return res.status(422).json({ message: location.data });
        }

        // Order geolocation
        let coordinates = location.data;

        // Center point to calculate the distance
        const orderStores = await Store.find(
            { _id: { $in: stores } },
            function (err, array) {
                if (err) {
                    console.log(err);
                } else {
                    let objects = {};
                    array.forEach((o) => (objects[o._id] = o));
                    stores.map((store) => objects[store]);
                }
            }
        ).clone();

        const blackOutDays = await Store.findById(orderStores[0]._id).select(
            "blackOutDays -_id"
        );

        const days = await Days.find(
            { owner: orderStores[0]._id },
            (err, calendar) => {
                if (err) {
                    res.json("Error while fetching data");
                } else {
                    calendar
                        .map((date) => ({
                            name: new Date(date.day).toLocaleDateString(
                                "it-IT",
                                {
                                    weekday: "long",
                                }
                            ),
                            available: date.available,
                            weekday: date.weekday,
                            startHour: date.startHour,
                            endHour: date.endHour,
                        }))
                        .sort((a, b) => {
                            return a.weekday - b.weekday;
                        });
                }
            }
        )

            .select("-__v -slotTime")
            .clone();

        const slotList = await Days.aggregate([
            {
                $match: {
                    owner: orderStores[0]._id,
                    available: true,
                },
            },
            {
                $addFields: {
                    slotTime: {
                        $filter: {
                            input: "$slotTime",
                            as: "slotTime",
                            cond: {
                                $and: [
                                    { $gte: ["$$slotTime.time", "$startHour"] },
                                    { $lte: ["$$slotTime.time", "$endHour"] },
                                ],
                            },
                        },
                    },
                },
            },
        ]);

        const isOpen = orderStores[0].isOpen;

        const shopCoord = orderStores[0].location.coordinates;
        const deliveryRadius = orderStores[0].deliveryRadius;

        // create a new empty object
        let center = {};

        // copy array elements to the object
        for (let i = 0; i < shopCoord.length; i++) {
            center[i] = shopCoord[i];
        }

        center = renameKey(center, "0", "lng");
        center = renameKey(center, "1", "lat");

        // calculate distance from the store
        let distance = getDistance(center, coordinates, 3);

        if (isOpen) {
            if (distance <= deliveryRadius) {
                res.status(200).json({
                    success: true,
                    days: days,
                    blackOutDays: blackOutDays,
                    slotList: slotList,
                });
            } else {
                res.status(200).json({
                    success: false,
                });
            }
        } else {
            return next(new ErrorHandler("Store is closed", 400));
        }
    }
});

//route POST /api/v1/order/new
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
    } = req.fields;

    const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user._id,
    });

    await Store.findByIdAndUpdate(
        order.store,
        { $inc: { numOrders: 1 } },
        {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        }
    );

    res.status(200).json({
        success: true,
        order,
    });
});

// route GET /api/v1/orders/:id
exports.getOrderById = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate(
        "user",
        "name email"
    );
    if (!order) {
        return next(new ErrorHandler("Order not found", 404));
    }

    res.status(200).json({
        success: true,
        order,
    });
});

// Logged in user orders => route GET /api/v1/orders/me
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find({ user: req.user.id });

    res.status(200).json({
        success: true,
        orders,
    });
});

// Get all orders admin => route GET /api/v1/admin/orders
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find({}).populate("user", "id name");

    let totalAmount = 0;

    orders.forEach((order) => {
        totalAmount += order.totalPrice;
    });

    res.status(200).json({
        success: true,
        totalAmount,
        orders,
    });
});

// Update/ Process orders admin => route GET /api/v1/admin/order/:id
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (order.orderStatus === "Delivered") {
        return next(
            new ErrorHandler("You have already delivered this order", 400)
        );
    }

    order.orderItems.forEach(async (item) => {
        await updateStock(item.product, item.qty);
    });

    (order.orderStatus = req.fields.status), (order.deliveredAt = Date.now());

    await order.save();

    res.status(200).json({
        success: true,
    });
});

async function updateStock(id, quantity) {
    const product = await Order.findById(id);

    product.stock = product.stock - quantity;

    await product.save({ validateBeforeSave: false });
}

// Delete order   =>   /api/v1/admin/order/:id
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler("No Order found with this ID", 404));
    }

    await order.remove();

    await Store.findByIdAndUpdate(
        order.store,
        { $decr: { numOrders: 1 } },
        {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        }
    );

    res.status(200).json({
        success: true,
    });
});
