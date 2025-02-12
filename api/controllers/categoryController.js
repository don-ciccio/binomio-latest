const Category = require("../models/category");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Create new product => /api/admin/category/new
exports.newCategory = catchAsyncErrors(async (req, res, next) => {
    const { name, parent, images, description, properties, idx } = req.body;
    if (!name || !idx) {
        return next(new ErrorHandler("Name and index are required", 400));
    }

    let category = Category.create({
        name,
        images,
        description,
        parent: parent || undefined,
        properties,
        idx,
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
                        idx: 1,
                        number_of_product: { $size: "$products" },
                    },
                },
            ]).exec();
            const admin = await Category.populate(data, { path: "parent" });
            const menu = data?.filter((p) => !p.hasOwnProperty("parent"));
            const food = data?.filter((p) => p.hasOwnProperty("parent"));

            res.status(200).json({ admin, menu, food });
        }
    } catch (error) {
        return next(new ErrorHandler(error.message, 404));
    }
});

exports.updateCategory = catchAsyncErrors(async (req, res, next) => {
    const { name, parent, images, description, properties, _id, idx } =
        req.body;
    if (!name || !_id || !idx) {
        return next(new ErrorHandler("Name, ID and index are required", 400));
    }
    const category = await Category.updateOne(
        { _id },
        {
            name,
            images,
            description,
            parent: parent || undefined,
            properties,
            idx,
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
        message: "Category deleted",
    });
});
