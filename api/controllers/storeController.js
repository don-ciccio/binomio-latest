const Store = require("../models/store");
const Days = require("../models/days");

const mongoose = require("mongoose");

const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { generateWeek } = require("../utils/apiFunctions");

const ErrorHandler = require("../utils/errorHandler");

exports.newStore = catchAsyncErrors(async (req, res, next) => {
    const { isOpen, name, shopAddress, deliveryRadius } = req.body;

    try {
        const store = new Store({
            isOpen,
            name,
            shopAddress,
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

exports.getAllStores = catchAsyncErrors(async (req, res, next) => {
    try {
        if (req.params.id) {
            res.status(200).json(await Store.findOne({ _id: req.params.id }));
        } else {
            res.status(200).json(await Store.find().sort({ _id: -1 }));
        }
    } catch (error) {
        return next(new ErrorHandler(error.message, 404));
    }
});

exports.updateStore = catchAsyncErrors(async (req, res, next) => {
    const { isOpen, name, shopAddress, deliveryRadius, _id } = req.body;

    if (!name || !_id) {
        return next(new ErrorHandler(error.message, 400));
    }

    const store = await Store.updateOne(
        { _id },
        {
            isOpen,
            name,
            shopAddress,
            deliveryRadius,
        }
    );

    res.status(200).json({
        success: true,
        store,
    });
});

exports.getCalendarByStore = catchAsyncErrors(async (req, res, next) => {
    let filter = {};

    if (req.query.id) {
        filter = { owner: req.query.id };
    }

    await Days.find(filter, (err, calendar) => {
        if (err) {
            res.json("Error while fetching data");
        } else {
            let days = calendar
                .map((date) => ({
                    name: new Date(date.day).toLocaleDateString("it-IT", {
                        weekday: "long",
                    }),
                    available: date.available,
                    weekday: date.weekday,
                    startHour: date.startHour,
                    endHour: date.endHour,
                }))
                .sort((a, b) => {
                    return a.weekday - b.weekday;
                });

            res.json(days);
        }
    })

        .select("-__v -slotTime")
        .clone();
});

exports.getSlotsByWeekday = catchAsyncErrors(async (req, res, next) => {
    const slotList = await Days.aggregate([
        {
            $match: {
                owner: mongoose.Types.ObjectId(req.params.id),
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
    if (!slotList) {
        res.status(500).json({ success: false });
    }

    res.json(slotList);
});

exports.getBlackoutDays = catchAsyncErrors(async (req, res, next) => {
    try {
        const result = await Store.findById(req.params.id).select(
            "blackOutDays -_id"
        );
        res.json(result);
    } catch (error) {
        return next(new ErrorHandler(error.message, 400));
    }
});

exports.deliverySettings = catchAsyncErrors(async (req, res, next) => {
    let { settings, slots, dates, selected } = req.body;

    try {
        if (dates.length > 0) {
            const ISOarray = dates.map((date) => {
                return new Date(
                    new Date(date).setDate(new Date(date).getDate() + 1)
                );
            });

            await Store.findByIdAndUpdate(
                { _id: mongoose.Types.ObjectId(req.params.id) },
                {
                    $push: {
                        blackOutDays: { $each: ISOarray },
                    },
                },
                {
                    new: true,
                    upsert: true,
                }
            );
        }

        if (selected.length > 0) {
            const ISOselected = selected.map((date) => {
                return new Date(
                    new Date(date).setDate(new Date(date).getDate() + 1)
                );
            });

            await Store.findByIdAndUpdate(
                { _id: mongoose.Types.ObjectId(req.params.id) },
                {
                    $pull: {
                        blackOutDays: {
                            $in: ISOselected,
                        },
                    },
                },
                {
                    new: true,
                }
            );
        }

        bulk = [];

        if (req.params.id) {
            settings?.forEach((item) => {
                let updateDoc = {
                    updateMany: {
                        filter: {
                            owner: req.params.id,
                            weekday: item.weekday,
                        },
                        update: {
                            $set: {
                                available: item.available,
                                startHour: item.startHour,
                                endHour: item.endHour,
                            },
                        },
                    },
                };

                bulk.push(updateDoc);
            });

            slots?.forEach((s) => {
                s.slotTime?.forEach((t) => {
                    let updateSlot = {
                        updateMany: {
                            filter: {
                                owner: req.params.id,
                                weekday: s.weekday,
                            },
                            update: {
                                $set: {
                                    "slotTime.$[elem].active": t.active,
                                },
                            },
                            arrayFilters: [{ "elem.time": t.time }],
                        },
                    };
                    bulk.push(updateSlot);
                });
            });
        }

        const options = { ordered: false };

        await Days.bulkWrite(bulk, options);

        res.status(200).json({
            success: true,
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 400));
    }
});
