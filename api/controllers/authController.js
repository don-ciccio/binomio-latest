const User = require("../models/user");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");

// Register the user => /api/v1/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;

    const fields = {
        name,
        email,
        password,
    };

    let newUser = new User({ ...fields });
    newUser
        .save()
        .then((user) => {
            res.json({ message: "User created successfully", user });
        })
        .catch((err) => {
            return next(new ErrorHandler(err.message, 400));
        });
});

// Get currently logged in user profile => /api/v1/me
exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    if (!user) {
        next(new ErrorHandler("User not login", 403));
    }
    res.status(200).json({
        success: true,
        user,
        message: `Bentornato, ${user.name}`,
    });
});

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    // Check if email and password are entered by the user
    if (!email || !password) {
        return next(new ErrorHandler("Please enter email and password", 400));
    }

    // Find the user in the database
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    // Check if password is correct
    const doesPasswordMatch = await user.comparePassword(password);

    if (!doesPasswordMatch) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    sendToken(user, 200, res);
});

// Logout the user => /api/v1/logout
exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged out successfully",
    });
});
