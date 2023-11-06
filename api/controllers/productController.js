const Product = require("../models/product");
const Category = require("../models/category");
const mongoose = require("mongoose");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Create new product => /api/v1/admin/product/new
exports.newProduct = catchAsyncErrors(async (req, res, next) => {
    const {
        name,
        description,
        price,
        images,
        category,
        properties,
        seller,
        status,
        store,
    } = req.body;

    if (
        !name ||
        !description ||
        !price ||
        !images ||
        !category ||
        !status ||
        !store
    ) {
        return next(new ErrorHandler("Field required", 400));
    }

    let product = Product.create({
        name,
        description,
        price,
        images,
        category,
        seller,
        status,
        store,
        properties,
    });

    res.status(200).json({
        success: true,
        product,
    });
});

// chnage status
exports.productStatus = catchAsyncErrors(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const productStatusUpdate = await Product.findByIdAndUpdate(
            { _id: id },
            { status: status },
            { new: true }
        );
        res.status(200).json(productStatusUpdate);
    } catch (error) {
        res.status(401).json(error);
    }
});

exports.getAutocomplete = catchAsyncErrors(async (req, res, next) => {
    let results;
    if (req.query.seller) {
        results = await Product.aggregate([
            {
                $search: {
                    index: "default",
                    autocomplete: {
                        query: req.query.seller,
                        path: "seller",
                        fuzzy: {
                            maxEdits: 1,
                        },
                        tokenOrder: "sequential",
                    },
                },
            },
            {
                $project: {
                    seller: 1,
                    _id: 1,
                },
            },
            {
                $limit: 10,
            },
            {
                $group: {
                    _id: "$seller",
                    seller: { $addToSet: "$seller" },
                },
            },
        ]);

        if (results) return res.send(results);
    }
    res.send([]);
});

// Get all products => /api/v1/products
exports.getProducts = catchAsyncErrors(async (req, res, next) => {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || "";
    let sort = req.query.sort || "All";
    let category = req.query.category || "All";

    const query = {
        name: { $regex: search, $options: "i" },
    };

    const categories = await Category.find();

    const newArray = categories.map((element) => element._id);
    category === "All"
        ? (category = [...newArray])
        : (category = req.query.category.split(","));

    req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

    if (sort[0] === "status") {
        query.status = sort[1];
    } else if (sort[1] === "status-selling") {
        query.stock = { $gt: 0 };
    } else if (sort[1] === "status-out-of-stock") {
        query.stock = { $lt: 1 };
    }

    let sortBy = {};

    if (sort[1] && sort[0] !== "status" && sort[0] !== "stock") {
        sortBy[sort[0]] = sort[1];
    } else {
        sortBy[sort[0]] = "asc";
    }

    const products = await Product.find(query)
        .where("category")
        .in([...category])
        .sort(sortBy)
        .skip(page * limit)
        .limit(limit)
        .populate("category")
        .exec();

    let total;
    if (query.status) {
        total = await Product.countDocuments({
            category: { $in: [...category] },
            name: { $regex: search, $options: "i" },
            status: query.status,
        });
    } else if (query.stock) {
        total = await Product.countDocuments({
            category: { $in: [...category] },
            name: { $regex: search, $options: "i" },
            stock: query.stock,
        });
    } else {
        total = await Product.countDocuments({
            category: { $in: [...category] },
            name: { $regex: search, $options: "i" },
        });
    }

    const categoriesObj = await Category.find({ _id: { $in: newArray } });

    const pageCount = Math.ceil(total / limit);

    const response = {
        error: false,
        pageCount,
        total,
        page: page + 1,
        limit,
        category: categoriesObj,
        products,
    };

    res.status(200).json(response);
});

exports.getProductsByCategory = catchAsyncErrors(async (req, res, next) => {
    const slugs = await Category.find({ slug: req.params.cat });
    const searchParams = req.query;
    const pre = `properties.`;
    const seller = req.query.seller;

    const properties = await Category.aggregate([
        {
            $match: { slug: { $eq: req.params.cat } },
        },
        {
            $lookup: {
                from: "products",
                localField: "_id",
                foreignField: "category",
                as: "products",
            },
        },
        { $unwind: "$products" },
        {
            $project: {
                _id: 0,
                filters: { $objectToArray: "$products.properties" },
            },
        },
        { $unwind: "$filters" },
        { $group: { _id: "$filters.k", values: { $addToSet: "$filters.v" } } },
        { $unwind: "$values" },
        { $sort: { values: 1 } },
        { $group: { _id: "$_id", values: { $push: "$values" } } },
        { $sort: { _id: -1 } },
    ]);

    const nObj = Object.keys(searchParams)
        .filter((key) => key !== "seller")
        .reduce((a, c) => ((a[`${pre}${c}`] = searchParams[c]), a), {});

    const sellers = await Product.find({ category: slugs }).distinct("seller");

    const query = {
        ...nObj,
        seller: seller,
    };

    if (seller !== undefined) {
        const products = await Product.find({
            $and: [{ category: slugs }, query],
        });
        if (!products) {
            return next(new ErrorHandler("Products not found", 404));
        }
        res.status(200).json({
            success: true,
            products,
            properties: properties,
            sellers: sellers,
        });
    } else {
        const products = await Product.find({
            $and: [{ category: slugs }, nObj],
        });
        if (!products) {
            return next(new ErrorHandler("Products not found", 404));
        }
        res.status(200).json({
            success: true,
            products,
            properties: properties,
            sellers: sellers,
        });
    }
});

exports.getMenuItems = catchAsyncErrors(async (req, res, next) => {
    const slugs = req.params.slug;

    const products = await Product.find({
        category: { $in: slugs.split(",") },
    });

    if (!products) {
        return next(new ErrorHandler("Products not found", 404));
    }
    res.status(200).json({
        success: true,
        products,
    });
});

// Get single product detail => /api/v1/product/:id
exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({
        success: true,
        product,
    });
});

exports.getSingleProductbySlug = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.find({ slug: req.params.slug });

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({
        success: true,
        product,
    });
});

// Get single product detail => /api/v1/product/:id
exports.getProductsbyId = catchAsyncErrors(async (req, res, next) => {
    const { filterBy } = req.query;

    if (filterBy.length > 0) {
        const products = await Product.find({
            _id: {
                $in: filterBy,
            },
        });
        if (!products) {
            return next(new ErrorHandler("Product not found", 404));
        }
        res.status(200).json({
            success: true,
            products,
        });
    }
});

// Update product => /api/v1/admin/product
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    const {
        name,
        description,
        price,
        _id,
        images,
        category,
        properties,
        seller,
        store,
        status,
    } = req.body;
    console.log(req.body);
    const product = await Product.updateOne(
        { _id },
        {
            name,
            description,
            price,
            images,
            category,
            properties,
            seller,
            store,
            status,
        }
    );

    res.status(200).json({
        success: true,
        product,
    });
});

// Delete product => /api/v1/admin/product/:id
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    await product.remove();

    res.status(200).json({
        success: true,
        message: "Product deleted",
    });
});
