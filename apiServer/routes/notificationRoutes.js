const express = require("express");
const { auth } = require("../middleware/authMiddleware");
const { getMyNotifications } = require("../controllers/notificationController");

const router = express.Router();

router.use(auth);
router.get("/", getMyNotifications);

module.exports = router;
