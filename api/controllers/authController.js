const User = require("../models/user");
const Session = require("../models/session");
const Product = require("../models/product");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const jwt = require("jsonwebtoken");

const { OAuth2Client, UserRefreshClient } = require("google-auth-library");

const oAuth2Client = new OAuth2Client(
    process.env.GOOGLE_CLIENT,
    process.env.GOOGLE_SECRET,
    "postmessage"
);
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

    req.session.user = {
        name: user.name,
        isLoggedIn: true,
    };

    await req.session.save();

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

exports.googleController = catchAsyncErrors(async (req, res) => {
    const { tokens } = await oAuth2Client.getToken(req.body.code); // exchange code for tokens
    oAuth2Client
        .verifyIdToken({
            idToken: tokens.id_token,
            audience: process.env.GOOGLE_CLIENT,
        })
        .then((response) => {
            const { email_verified, name, email } = response.payload;
            if (email_verified) {
                User.findOne({ email }).exec((err, user) => {
                    if (user) {
                        const options = {
                            expires: new Date(
                                Date.now() +
                                    process.env.COOKIE_EXPIRATION_TIME *
                                        24 *
                                        60 *
                                        60 *
                                        1000
                            ),
                            httpOnly: true,
                            secure: true,
                            sameSite: "none",
                        };

                        req.session.user = {
                            name: user.name,
                            isLoggedIn: true,
                        };

                        req.session.save();
                        res.status(200)
                            .cookie("user_token", tokens.id_token, options)
                            .cookie("ref_token", tokens.refresh_token, options)
                            .json({
                                success: true,
                                user,
                                message: "Login Successfully",
                            });
                    } else {
                        let password = email + process.env.JWT_SECRET;
                        user = new User({ name, email, password });
                        user.save((err, data) => {
                            if (err) {
                                console.log(
                                    "ERROR GOOGLE LOGIN ON USER SAVE",
                                    err
                                );
                                return res.status(400).json({
                                    error: "User signup failed with google",
                                });
                            }

                            const options = {
                                expires: new Date(
                                    Date.now() +
                                        process.env.COOKIE_EXPIRATION_TIME *
                                            24 *
                                            60 *
                                            60 *
                                            1000
                                ),
                                httpOnly: true,
                                secure: true,
                                sameSite: "none",
                            };

                            req.session.user = {
                                name: user.name,
                                isLoggedIn: true,
                            };

                            req.session.save();
                            res.status(200)
                                .cookie("user_token", tokens.id_token, options)
                                .cookie(
                                    "ref_token",
                                    tokens.refresh_token,
                                    options
                                )
                                .json({
                                    success: true,
                                    user,
                                    message: "Login Successfully",
                                });
                        });
                    }
                });
            } else {
                return res.status(400).json({
                    error: "Google login failed. Try again",
                });
            }
        });
});

exports.refreshToken = catchAsyncErrors(async (req, res, next) => {
    const ref_token = req.cookies.ref_token;

    if (!ref_token) {
        next(new ErrorHandler("User not login", 403));
    }

    const user = new UserRefreshClient(
        process.env.GOOGLE_CLIENT,
        process.env.GOOGLE_SECRET,
        ref_token
    );
    const { credentials } = await user.refreshAccessToken(); // optain new tokens
    oAuth2Client
        .verifyIdToken({
            idToken: credentials.id_token,
            audience: process.env.GOOGLE_CLIENT,
        })
        .then((response) => {
            const { email_verified, name, email } = response.payload;
            if (email_verified) {
                User.findOne({ email }).exec((err, user) => {
                    if (user) {
                        const options = {
                            expires: new Date(
                                Date.now() +
                                    process.env.COOKIE_EXPIRATION_TIME *
                                        24 *
                                        60 *
                                        60 *
                                        1000
                            ),
                            httpOnly: true,
                            secure: true,
                            sameSite: "none",
                        };

                        res.status(200)
                            .cookie("user_token", credentials.id_token, options)
                            .cookie(
                                "ref_token",
                                credentials.refresh_token,
                                options
                            )
                            .json({
                                success: true,
                                user,
                                message: "Welcome Back!",
                            });
                    }
                });
            } else {
                return res.status(400).json({
                    error: "Google login failed. Try again",
                });
            }
        });
});

exports.countSessions = catchAsyncErrors(async (req, res, next) => {
    const total = await Session.countDocuments();

    const totalProducts = await Product.countDocuments();
    const activeProducts = await Product.find({ status: "Attivo" });
    const inactiveProducts = await Product.find({ status: "Bozza" });

    const sessions = await Session.find();

    if (total === 0) {
        return res.status(200).json({
            total,
            sessions,
            totalProducts,
            activeProducts: activeProducts.length,
            inactiveProducts: inactiveProducts.length,
        });
    }

    res.status(200).json({
        total,
        sessions,
        totalProducts,
        activeProducts: activeProducts.length,
        inactiveProducts: inactiveProducts.length,
    });
});
