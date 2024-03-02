const mongoose = require("mongoose");
const Store = require("../models/store");
const Table = require("../models/table");
const Days = require("../models/days");
const ReservationDays = require("../models/reservationDays");
const Reservation = require("../models/reservation");

const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");

exports.newDay = catchAsyncErrors(async (req, res, next) => {
    let dateTime = new Date(req.body.data);
    dateTime = new Date(
        dateTime.getTime() + Math.abs(dateTime.getTimezoneOffset() * 60000)
    );

    try {
        const result = await ReservationDays.find({
            $and: [{ date: dateTime, owner: req.params.id }],
        });

        if (result.length > 0) {
            console.log("Record exists. Sent docs.");
            res.status(200).send(...result);
        } else {
            const tables = await Table.find({
                restaurant: mongoose.Types.ObjectId(req.params.id),
            });

            const day = new ReservationDays({
                date: dateTime,
                tables: tables,
                owner: req.params.id,
            });

            if (day) {
                day.save(day);
            } else {
                res.status(400).send("Error saving new date");
            }

            res.status(200).send(day);
        }
    } catch (error) {
        return next(new ErrorHandler(error.message, 400));
    }
});

exports.reservationForm = catchAsyncErrors(async (req, res, next) => {
    let dateTime = new Date(req.body.date);
    dateTime = new Date(
        dateTime.getTime() + Math.abs(dateTime.getTimezoneOffset() * 60000)
    );

    try {
        const result = await ReservationDays.find({
            $and: [{ date: dateTime, owner: req.params.id }],
        });

        if (result.length > 0) {
            let day = result[0];
            day.tables.forEach((table) => {
                if (table._id == req.body.table) {
                    // The correct table is table
                    table.reservation = new Reservation({
                        firstName: req.body.name,
                        phoneNumber: req.body.phone,
                        email: req.body.email,
                        time: req.body.time,
                        size: req.body.size,
                    });
                    table.isAvailable = false;
                    console.log(day);
                    day.save((err) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log("Reserved");
                            res.status(200).send("Added Reservation");
                        }
                    });
                }
            });
        } else {
            console.log("Day not found");
        }
    } catch (error) {
        return next(new ErrorHandler(error.message, 400));
    }
});
exports.bookingSettings = catchAsyncErrors(async (req, res, next) => {
    const {
        area,
        selected,
        table,
        removeTable,
        settings,
        dates,
        dateSelected,
    } = req.body;
    try {
        if (table && table.length > 0) {
            await Table.create(table);
        }

        if (removeTable && removeTable.length > 0) {
            await Table.deleteMany({ name: removeTable }, function (err) {
                console.log("Delete successfully");
            }).clone();
        }

        if (area && area.length > 0) {
            await Store.findByIdAndUpdate(
                { _id: mongoose.Types.ObjectId(req.params.id) },
                {
                    $push: {
                        area: { $each: area },
                    },
                },
                {
                    new: true,
                    upsert: true,
                }
            );
        }
        if (selected && selected.length > 0) {
            await Store.findByIdAndUpdate(
                { _id: mongoose.Types.ObjectId(req.params.id) },
                {
                    $pull: {
                        area: {
                            $in: selected,
                        },
                    },
                },
                {
                    new: true,
                }
            );
        }

        bulk = [];
        if (dates?.length > 0) {
            const ISOarray = dates.map((date) => {
                return new Date(
                    new Date(date).setDate(new Date(date).getDate() + 1)
                );
            });

            await Store.findByIdAndUpdate(
                { _id: mongoose.Types.ObjectId(req.params.id) },
                {
                    $push: {
                        reservationBlackOutDays: { $each: ISOarray },
                    },
                },
                {
                    new: true,
                    upsert: true,
                }
            );
        }

        if (dateSelected?.length > 0) {
            const ISOselected = dateSelected.map((date) => {
                return new Date(
                    new Date(date).setDate(new Date(date).getDate() + 1)
                );
            });

            await Store.findByIdAndUpdate(
                { _id: mongoose.Types.ObjectId(req.params.id) },
                {
                    $pull: {
                        reservationBlackOutDays: {
                            $in: ISOselected,
                        },
                    },
                },
                {
                    new: true,
                }
            );
        }

        if (settings && req.params.id) {
            settings?.forEach((item) => {
                let updateDoc = {
                    updateMany: {
                        filter: {
                            owner: req.params.id,
                            weekday: item.weekday,
                        },
                        update: {
                            $set: {
                                reservationAvailable: item.reservationAvailable,
                                startBookingHour: item.startBookingHour,
                                endBookingHour: item.endBookingHour,
                            },
                        },
                    },
                };

                bulk.push(updateDoc);
            });

            const options = { ordered: false };

            await Days.bulkWrite(bulk, options);
        }
        res.status(200).json({
            success: true,
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 400));
    }
});

exports.getTables = catchAsyncErrors(async (req, res, next) => {
    try {
        const tables = await Table.find({ restaurant: req.params.id });

        res.json(tables);
    } catch (error) {
        return next(new ErrorHandler(error.message, 400));
    }
});

exports.getReservationDays = catchAsyncErrors(async (req, res, next) => {
    let dateTime = new Date(req.query.date);

    try {
        const reservation = await ReservationDays.find({
            $and: [
                {
                    date: dateTime,
                    owner: req.params.id,
                },
            ],
        });

        res.json(reservation);
    } catch (error) {
        return next(new ErrorHandler(error.message, 400));
    }
});

exports.getBookingBlackoutDays = catchAsyncErrors(async (req, res, next) => {
    try {
        const result = await Store.findById(req.params.id).select(
            "reservationBlackOutDays -_id"
        );
        res.json(result);
    } catch (error) {
        return next(new ErrorHandler(error.message, 400));
    }
});
