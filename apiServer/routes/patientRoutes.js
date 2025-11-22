const express = require("express");
const {
  getDashboard,
  addDailyLog,
  getProfile,
  updateProfile,
} = require("../controllers/patientController");
const { auth, requireRole } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(auth, requireRole("patient"));

router.get("/dashboard", getDashboard);
router.post("/logs", addDailyLog);
router.get("/profile", getProfile);
router.put("/profile", updateProfile);

module.exports = router;
