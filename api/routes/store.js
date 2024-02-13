const express = require("express");
const router = express.Router();

const {
    newStore,
    getAllStores,
    updateStore,
    getCalendarByStore,
    getSlotsByWeekday,
    getBlackoutDays,
    getArea,
    deliverySettings,
} = require("../controllers/storeController");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const {
    bookingSettings,
    getTables,
} = require("../controllers/availabilityController");

router
    .route("/admin/store/new")
    .post(isAuthenticatedUser, authorizeRoles("admin"), newStore);

router.route("/stores/:id").get(getAllStores);
router
    .route("/admin/store")
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateStore)
    .get(isAuthenticatedUser, authorizeRoles("admin"), getAllStores);

router
    .route("/admin/calendar/:id")
    .get(isAuthenticatedUser, getCalendarByStore);

router
    .route("/admin/calendar/:id/slots")
    .get(isAuthenticatedUser, authorizeRoles("admin"), getSlotsByWeekday);

router
    .route("/admin/calendar/:id/blackoutdays")
    .get(isAuthenticatedUser, authorizeRoles("admin"), getBlackoutDays);

router
    .route("/admin/booking/:id/area")
    .get(isAuthenticatedUser, authorizeRoles("admin"), getArea);

router
    .route("/admin/calendar/:id/settings")
    .put(isAuthenticatedUser, authorizeRoles("admin"), deliverySettings);

router
    .route("/admin/booking/:id/settings")
    .put(isAuthenticatedUser, authorizeRoles("admin"), bookingSettings);

router
    .route("/admin/booking/:id/tables")
    .get(isAuthenticatedUser, authorizeRoles("admin"), getTables);

module.exports = router;
