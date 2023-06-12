const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contentSchema = new Schema({
    topbar: { type: String, default: "" },
});

module.exports = mongoose.model("Content", contentSchema);
