const User = require("../models/user");
const jwt = require("jsonwebtoken");
const catchAsyncErrors = require("./catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");

// Check if user is authenticated or not
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const getAuthToken = (req, res, next) => {
        if (
            req.headers.authorization &&
            req.headers.authorization.split(" ")[0] === "Bearer"
        ) {
            req.authToken = req.headers.authorization.split(" ")[1];
        } else {
            req.authToken = null;
        }
        next();
    };
    getAuthToken(req, res, async () => {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id);

            next();
        } catch (e) {
            return res
                .status(401)
                .send({ error: "You are not authorized to make this request" });
        }
    });
});

// Handle the user role change
exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorHandler(
                    `Role (${req.user.role}) is not allowed to acccess this resource`,
                    403
                )
            );
        }
        next();
    };
};
