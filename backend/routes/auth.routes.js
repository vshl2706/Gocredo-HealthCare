const express = require("express");
const { signup, login, verifyOtp } = require("../controllers/authController");

const router = express.Router();

// Create Account (matching your form)
router.post("/signup", signup);

// Login
router.post("/login", login);

// Optional MFA
router.post("/verify-otp", verifyOtp);

module.exports = router;
