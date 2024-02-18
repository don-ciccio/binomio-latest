const express = require("express");

const router = express.Router();

const {
    registerUser,
    loginUser,
    getUserProfile,
    googleController,
    refreshToken,
    logout,
    countSessions,
} = require("../controllers/authController");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);
router.route("/logout").get(logout);

router.route("/me").get(isAuthenticatedUser, getUserProfile);
router.route("/admin/session").get(isAuthenticatedUser, countSessions);

// Google and Facebook Login
router.route("/auth/google").post(googleController);
router.route("/auth/google/refresh").post(refreshToken);

module.exports = router;
