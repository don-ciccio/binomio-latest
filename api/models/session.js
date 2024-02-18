const mongoose = require("mongoose");

let sessionSchema = new mongoose.Schema({
    _id: { type: String },
    session: { type: String, unique: true },
    expires: { type: Date },
    lastModified: { type: Date },
});

module.exports = mongoose.model("Session", sessionSchema);
