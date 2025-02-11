const express = require("express");

const router = express.Router();

const {
    getProducts,
    productStatus,
    newProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    getAutocomplete,
    getProductsbyId,
    getProductsByCategory,
    getSingleProductbySlug,
    getMenuItems,
} = require("../controllers/productController");

const {
    uploadImages,
    deleteImages,
} = require("../controllers/uploadController");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/products").get(getProducts);

router.route("/product/:cat").get(getProductsByCategory);
router.route("/menu/:slug").get(getMenuItems);
router.route("/product/single/:slug").get(getSingleProductbySlug);
router.route("/product/edit/:id").get(getSingleProduct);

router.route("/products/cart").get(getProductsbyId);

router.route("/products/upload").post(uploadImages).delete(deleteImages);
router.route("/product/autocomplete/seller").get(getAutocomplete);

router.route("/admin/product/new").post(isAuthenticatedUser, newProduct);
router
    .route("/admin/product/status/:id")
    .put(isAuthenticatedUser, authorizeRoles("admin"), productStatus);
router
    .route("/admin/product")
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct);

router
    .route("/admin/product/delete")
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

module.exports = router;
