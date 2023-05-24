const express = require("express");

const router = express.Router();

const {
    getProducts,
    productStatus,
    newProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct,
} = require("../controllers/productController");

const {
    uploadImages,
    deleteImages,
} = require("../controllers/uploadController");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/products").get(getProducts);
router.route("/product/:id").get(getSingleProduct);
router.route("/products/upload").post(uploadImages).delete(deleteImages);

router.route("/admin/product/new").post(isAuthenticatedUser, newProduct);
router
    .route("/admin/product/status/:id")
    .put(isAuthenticatedUser, authorizeRoles("admin"), productStatus);
router
    .route("/admin/product")
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)

    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

module.exports = router;
