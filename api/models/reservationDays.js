const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const tableSchema = require("./table").schema;

const reservationDaysSchema = new Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "Store" },
    date: { type: Date },
    tables: [tableSchema],
});

module.exports = mongoose.model("Days", reservationDaysSchema);
