const ReservationDays = require("../models/reservationDays");

const mongoose = require("mongoose");

const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");

exports.newDay = catchAsyncErrors(async (req, res, next) => {
    const dateTime = new Date(req.body.date);

    try {
        ReservationDays.find(
            { $and: [{ date: dateTime, owner: req.params.id }] },
            (err, docs) => {
                if (!err) {
                    if (docs.length > 0) {
                        // Record already exists
                        console.log("Record exists. Sent docs.");
                        res.status(200).send(docs[0]);
                    } else {
                        // Searched date does not exist and we need to create it
                        const allTables = require("../data/allTables");
                        const day = new ReservationDays({
                            date: dateTime,
                            tables: allTables,
                            owner: req.params.id,
                        });
                        day.save((err) => {
                            if (err) {
                                res.status(400).send("Error saving new date");
                            } else {
                                // Saved date and need to return all tables (because all are now available)
                                console.log(
                                    "Created new datetime. Here are the default docs"
                                );
                                ReservationDays.find(
                                    {
                                        $and: [
                                            {
                                                date: dateTime,
                                                owner: req.params.id,
                                            },
                                        ],
                                    },
                                    (err, docs) => {
                                        err
                                            ? res.sendStatus(400)
                                            : res.status(200).send(docs[0]);
                                    }
                                );
                            }
                        });
                    }
                } else {
                    res.status(400).send("Could not search for date");
                }
            }
        );
    } catch (error) {
        return next(new ErrorHandler(error.message, 400));
    }
});
