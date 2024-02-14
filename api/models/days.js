const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const daySchema = new Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "Store" },
    day: { type: Date },
    available: { type: Boolean, default: false },
    reservationAvailable: { type: Boolean, default: false },
    blackOutDay: { type: Boolean, default: false },
    weekday: { type: Number },
    startBookingHour: { type: Number, required: true, default: 63000000 },
    endBookingHour: { type: Number, required: true, default: 81000000 },
    startHour: { type: Number, required: true, default: 63000000 },
    endHour: { type: Number, required: true, default: 81000000 },
    slotTime: [
        {
            time: { type: Number, required: true },
            active: { type: Boolean, required: true, default: false },
            _id: false,
        },
    ],
});

module.exports = mongoose.model("Days", daySchema);
