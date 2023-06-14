const express = require("express");
const router = express.Router();

const {
    getCategories,
    updateCategory,
    newCategory,
    deleteCategory,
} = require("../controllers/categoryController");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const {
    uploadCategoryImages,
    deleteImages,
} = require("../controllers/uploadController");

router.route("/categories").get(getCategories);
router
    .route("/categories/upload")
    .post(uploadCategoryImages)
    .delete(deleteImages);
router.route("/category/:id").get(getCategories);

router.route("/admin/category/new").post(isAuthenticatedUser, newCategory);

router
    .route("/admin/category")
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateCategory);
router
    .route("/admin/category/delete")
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteCategory);

module.exports = router;
