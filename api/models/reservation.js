const mongoose = require("mongoose");

let reservationSchema = new mongoose.Schema({
    firstName: String,
    email: String,
    phoneNumber: String,
});

module.exports = mongoose.model("Reservation", reservationSchema);
