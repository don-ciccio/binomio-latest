const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tableSchema = new Schema({
    name: {
        type: String,
        default: 0,
        unique: true,
    },
    isAvailable: {
        type: Boolean,
        default: true,
    },
    seats: {
        type: Number,
        default: true,
    },
    location: {
        type: String,
        default: true,
    },
    restaurant: {
        type: mongoose.Schema.ObjectId,
        ref: "Store",
        required: false,
    },
    reservation: {
        type: mongoose.Schema.ObjectId,
        ref: "Reservation",
        required: false,
    },
});

const Table = mongoose.model("Table", tableSchema);
module.exports = Table;
