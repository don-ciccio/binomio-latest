const Category = require("../models/category");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Create new product => /api/admin/category/new
exports.newCategory = catchAsyncErrors(async (req, res, next) => {
    const { name, parent, images, description, properties } = req.body;
    if (!name) {
        return next(new ErrorHandler("Field required", 400));
    }

    let category = Category.create({
        name,
        images,
        description,
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
            let data = await Category.aggregate([
                {
                    $match: { name: { $regex: search, $options: "i" } },
                },
                {
                    $lookup: {
                        from: "products",
                        localField: "_id",
                        foreignField: "category",
                        as: "products",
                    },
                },
                {
                    $project: {
                        name: 1,
                        _id: 1,
                        parent: 1,
                        images: 1,
                        description: 1,
                        properties: 1,
                        slug: 1,
                        number_of_product: { $size: "$products" },
                    },
                },
            ]).exec();

            res.status(200).json(
                await Category.populate(data, { path: "parent" })
            );
        }
    } catch (error) {
        return next(new ErrorHandler(error.message, 404));
    }
});

exports.updateCategory = catchAsyncErrors(async (req, res, next) => {
    const { name, parent, images, description, properties, _id } = req.body;
    console.log(properties);
    if (!name || !_id) {
        return next(new ErrorHandler(error.message, 400));
    }
    const category = await Category.updateOne(
        { _id },
        {
            name,
            images,
            description,
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
