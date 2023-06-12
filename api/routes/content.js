const express = require("express");
const router = express.Router();

const {
    topbarContent,
    getContent,
} = require("../controllers/contentController");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router
    .route("/admin/content")
    .put(isAuthenticatedUser, authorizeRoles("admin"), topbarContent)
    .post(isAuthenticatedUser, authorizeRoles("admin"), topbarContent);

router.route("/admin/content").get(getContent);

module.exports = router;
