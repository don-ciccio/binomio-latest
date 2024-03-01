const mongoose = require("mongoose");

let reservationSchema = new mongoose.Schema({
    firstName: String,
    email: String,
    phoneNumber: String,
    time: Number,
});

module.exports = mongoose.model("Reservation", reservationSchema);
