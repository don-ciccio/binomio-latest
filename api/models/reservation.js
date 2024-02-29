const mongoose = require("mongoose");

let reservationSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    phoneNumber: String,
});

module.exports = mongoose.model("Reservation", reservationSchema);
