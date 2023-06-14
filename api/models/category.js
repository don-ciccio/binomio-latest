const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter category name"],
    },
    parent: {
        type: mongoose.Types.ObjectId,
        ref: "Category",
    },
    description: {
        type: String,
    },
    images: [{ type: String }],
    properties: [{ type: Object }],
});

module.exports = mongoose.model("Category", categorySchema);
