const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const fs = require("fs");
const promisifyUpload = require("../utils/promisifyUpload");
const sharp = require("sharp");
const { Rembg } = require("rembg-node");
const { uploadFile, deleteFile } = require("../utils/s3.js");
const url = require("url");

exports.uploadImages = catchAsyncErrors(async (req, res, next) => {
    const { files } = await promisifyUpload(req);

    try {
        if (!files) {
            next(new ErrorHandler("File not uploaded", 500));
        }

        const links = [];

        for (const file of files.file) {
            const newFilename = `productImage_${Date.now().toString()}.webp`;
            const input = sharp(fs.readFileSync(file.path));
            const rembg = new Rembg({
                logging: true,
            });
            const output = await rembg.remove(input);
            await output
                .trim()
                .resize({
                    height: 600,
                    width: 600,
                    fit: "contain",
                    position: sharp.gravity.center,
                    background: {
                        r: 255,
                        g: 255,
                        b: 255,
                        alpha: 0,
                    },
                })
                .toFormat("webp", {
                    quality: 70,
                    alphaQuality: 70,
                    nearLossless: true,
                })
                .toBuffer({ resolveWithObject: true })
                .then(async ({ data }) => {
                    await uploadFile(
                        data,
                        `productImage/${newFilename}`,
                        "image/webp"
                    );
                });

            const link = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/productImage/${newFilename}`;
            links.push(link);
            return res.json({ links });
        }
    } catch (error) {
        return next(new ErrorHandler(error.message, 400));
    }
});

exports.uploadCategoryImages = catchAsyncErrors(async (req, res, next) => {
    const { files } = await promisifyUpload(req);

    try {
        if (!files) {
            next(new ErrorHandler("File not uploaded", 500));
        }

        const links = [];

        for (const file of files.file) {
            const newFilename = `categoryImage_${Date.now().toString()}.webp`;
            const input = sharp(fs.readFileSync(file.path));

            await input
                .trim()
                .resize({
                    height: 600,
                    width: 600,
                    fit: "contain",
                    position: "bottom",
                    background: {
                        r: 0,
                        g: 0,
                        b: 0,
                        alpha: 1,
                    },
                })
                .toFormat("webp", {
                    quality: 70,
                    alphaQuality: 70,
                    nearLossless: true,
                })
                .toBuffer({ resolveWithObject: true })
                .then(async ({ data }) => {
                    await uploadFile(
                        data,
                        `categoryImage/${newFilename}`,
                        "image/webp"
                    );
                });

            const link = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/categoryImage/${newFilename}`;
            links.push(link);
            return res.json({ links });
        }
    } catch (error) {
        return next(new ErrorHandler(error.message, 400));
    }
});

exports.deleteImages = catchAsyncErrors(async (req, res, next) => {
    const adr = req.body.url;

    var { pathname } = url.parse(adr, true);

    if (!adr) {
        next(new ErrorHandler("File not found", 500));
    }

    const data = await deleteFile(pathname.substring(1));
    return res.status(200).json({
        success: true,
        data,
    });
});
