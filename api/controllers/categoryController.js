const Category = require("../models/category");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

exports.getCategories = catchAsyncErrors(async (req, res, next) => {
    try {
        if (req.query?.id) {
            res.status(200).json(await Category.findOne({ _id: req.query.id }));
        } else {
            res.status(200).json(await Category.find().populate("parent"));
        }
    } catch (error) {
        return next(new ErrorHandler(error.message, 404));
    }
});
