const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter product name"],
        trim: true,
        maxlength: [100, "Product name cannot exceed 100 characters"],
    },
    price: {
        type: Number,
        required: [true, "Please enter product price"],
        maxlength: [5, "Product price cannot exceed 5 characters"],
        default: 0.0,
    },
    description: {
        type: String,
        required: [true, "Please enter product description"],
    },
    ratings: {
        type: Number,
        default: 0,
    },
    images: [{ type: String }],
    category: {
        type: mongoose.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    properties: { type: Object },
    status: { type: String },
    store: {
        type: mongoose.Schema.ObjectId,
        ref: "Store",
        required: false,
    },
    seller: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: [true, "Please enter product stock"],
        maxlength: [5, "Stock length cannot exceed 5 characters"],
        default: 0.0,
    },
    numOfReviews: {
        type: Number,
        default: 0,
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: false,
            },
            name: {
                type: String,
                required: false,
            },
            rating: {
                type: Number,
                required: false,
            },
            comment: {
                type: String,
                required: false,
            },
        },
    ],
    orderCount: Number,
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

productSchema.pre("find", function () {
    this.populate("category");
});

module.exports = mongoose.model("Product", productSchema);
