const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter a valid username"],
        maxLength: [30, "Your username cannot be more than 30 characters"],
    },
    email: {
        type: String,
        required: [true, "Please enter a valid email"],
        unique: true,
    },
    phoneNumber: {
        type: String,
    },
    password: {
        type: String,
        required: [true, "Please enter a valid password"],
        minlength: [6, "Your password must be at least 6 characters"],
        select: false,
    },
    avatar: {
        type: String,
        default: "user.png",
    },
    role: {
        type: String,
        default: "user",
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
});

// Encrypting password before saving user
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }

    this.password = bcrypt.hash(this.password, 10);
});

// Compare user password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Return JWT token
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME,
    });
};

// Generate password reset token
userSchema.methods.getResetPasswordToken = function () {
    // Generate token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Hash and set to resetPasswordToken
    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    // Set token expire time
    this.resetPasswordExpires = Date.now() + 30 * 60 * 1000;

    return resetToken;
};

module.exports = mongoose.model("User", userSchema);
