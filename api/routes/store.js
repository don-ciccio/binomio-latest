const express = require("express");
const router = express.Router();

const {
    newStore,
    getAllStores,
    updateStore,
} = require("../controllers/storeController");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router
    .route("/admin/store/new")
    .post(isAuthenticatedUser, authorizeRoles("admin"), newStore);

router.route("/stores/:id").get(getAllStores);
router
    .route("/admin/store")
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateStore)
    .get(isAuthenticatedUser, authorizeRoles("admin"), getAllStores);

module.exports = router;
