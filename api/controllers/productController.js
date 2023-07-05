const Product = require("../models/product");
const Category = require("../models/category");

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
    } = req.body;

    if (!name || !description || !price || !images || !category || !status) {
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
    let sort = req.query.sort || "ratings";
    let category = req.query.category || "All";
    let status = req.query.status || "All";

    const query = {
        name: { $regex: search, $options: "i" },
    };

    if (status !== "All") {
        query.status = status;
    }

    const categories = await Category.find();

    const newArray = categories.map((element) => element._id);
    category === "All"
        ? (category = [...newArray])
        : (category = req.query.category.split(","));

    req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

    let sortBy = {};
    if (sort[1]) {
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

    const total = await Product.countDocuments({
        category: { $in: [...category] },
        name: { $regex: search, $options: "i" },
    });
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
    const products = await Product.find({ category: req.params.cat });

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
        status,
    } = req.body;

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
