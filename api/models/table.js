const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const reservationSchema = require("./reservation").schema;

const tableSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    isAvailable: {
        type: Boolean,
        default: true,
    },
    seats: {
        type: Number,
    },
    location: {
        type: String,
    },
    restaurant: {
        type: mongoose.Schema.ObjectId,
        ref: "Store",
        required: false,
    },
    reservation: reservationSchema,
});

const Table = mongoose.model("Table", tableSchema);
module.exports = Table;
