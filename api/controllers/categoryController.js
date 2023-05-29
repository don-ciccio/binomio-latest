const Category = require("../models/category");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Create new product => /api/admin/category/new
exports.newCategory = catchAsyncErrors(async (req, res, next) => {
    const { name, parent, properties } = req.body;
    if (!name) {
        return next(new ErrorHandler("Field required", 400));
    }

    let category = Category.create({
        name,
        parent: parent || undefined,
        properties,
    });
    res.status(200).json({
        success: true,
        category,
    });
});

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

exports.updateCategory = catchAsyncErrors(async (req, res, next) => {
    const { name, parent, properties, _id } = req.body;

    if (!name || !_id) {
        return next(new ErrorHandler(error.message, 400));
    }
    const category = await Category.updateOne(
        { _id },
        {
            name,
            parent: parent || undefined,
            properties,
        }
    );

    res.status(200).json({
        success: true,
        category,
    });
});

exports.deleteCategory = catchAsyncErrors(async (req, res, next) => {
    const { _id } = req.query;
    if (!_id) {
        return next(new ErrorHandler(error.message, 400));
    }
    await Category.deleteOne({ _id: _id });

    res.status(200).json({
        success: true,
        message: "Product deleted",
    });
});
