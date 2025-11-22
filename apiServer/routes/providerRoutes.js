const express = require("express");
const { getPatientsOverview } = require("../controllers/providerController");
const { auth, requireRole } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(auth, requireRole("doctor", "admin"));

router.get("/patients", getPatientsOverview);

module.exports = router;
