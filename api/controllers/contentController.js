const Content = require("../models/content");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

exports.topbarContent = catchAsyncErrors(async (req, res, next) => {
    const { topbar, _id } = req.body;

    if (!topbar) {
        return next(new ErrorHandler("Field required", 400));
    }

    if (_id) {
        const content = await Content.updateOne(
            { _id },
            {
                topbar,
            }
        );

        res.status(200).json({
            success: true,
            content,
        });
    } else {
        const content = Content.create({
            topbar,
        });

        res.status(200).json({
            success: true,
            content,
        });
    }
});

exports.getContent = catchAsyncErrors(async (req, res, next) => {
    const content = await Content.findOne(req.query.id);

    res.status(200).json({
        success: true,
        content,
    });
});
