const mongoose = require("mongoose");
const mongooseSlugPlugin = require("mongoose-slug-plugin");

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

categorySchema.plugin(mongooseSlugPlugin, { tmpl: "<%=name%>" });

module.exports = mongoose.model("Category", categorySchema);
