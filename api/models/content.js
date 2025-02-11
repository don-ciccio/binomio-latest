const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contentSchema = new Schema({
    topbar: { type: String, default: "" },
    heroTitle: { type: String, default: "" },
    heroDescription: { type: String, default: "" },
});

module.exports = mongoose.model("Content", contentSchema);
