const Store = require("../models/store");
const Days = require("../models/days");

const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { generateWeek } = require("../utils/apiFunctions");

exports.newStore = catchAsyncErrors(async (req, res, next) => {
    const { isOpen, name, shopAddress, deliveryRadius } = req.fields;

    const parsedOpen = JSON.parse(isOpen);
    const parsedShopAddress = JSON.parse(shopAddress);
    try {
        const store = new Store({
            isOpen: parsedOpen,
            name,
            shopAddress: parsedShopAddress,
            deliveryRadius,
        });

        Days.insertMany(generateWeek(), function (err, days) {
            if (err) {
                console.log(err);
            } else {
                days.forEach(async (d) => {
                    d.owner = store;
                    d.weekday = new Date(
                        new Date(d.day).getTime() -
                            new Date(d.day).getTimezoneOffset() * -6000
                    ).getDay();
                    await d.save();
                });

                store.save({ validateBeforeSave: false, upsert: true });
            }
        });

        res.status(201).json({
            success: true,
            store,
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 400));
    }
});
