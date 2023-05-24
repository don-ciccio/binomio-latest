const express = require("express");
const router = express.Router();

const { getCategories } = require("../controllers/categoryController");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/categories").get(getCategories);

module.exports = router;
