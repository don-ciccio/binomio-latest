const express = require("express");
const router = express.Router();

const {
    newOrder,
    getOrderById,
    myOrders,
    getAllOrders,
    updateOrder,
    deleteOrder,
    checkRadius,
    stripeIntent,
} = require("../controllers/orderController");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/checkRadius").post(isAuthenticatedUser, checkRadius);

router.route("/order/new").post(isAuthenticatedUser, newOrder);
router.route("/stripe_intent").post(stripeIntent);
router.route("/order/:id").get(isAuthenticatedUser, getOrderById);
router.route("/orders/me").get(isAuthenticatedUser, myOrders);

router
    .route("/admin/orders")
    .get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);
router
    .route("/admin/order/:id")
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder);

module.exports = router;
