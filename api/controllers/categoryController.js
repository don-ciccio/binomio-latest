const Category = require("../models/category");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

exports.getCategories = catchAsyncErrors(async (req, res, next) => {
    try {
        if (req.params.id) {
            res.status(200).json(
                await Category.findOne({ _id: req.params.id })
            );
        } else {
            const search = req.query.search || "";
            const query = {
                name: { $regex: search, $options: "i" },
            };
            res.status(200).json(await Category.find(query).populate("parent"));
        }
    } catch (error) {
        return next(new ErrorHandler(error.message, 404));
    }
});
