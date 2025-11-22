const express = require("express");
const router = express.Router();

const { signup, login, validateSignup } = require("../controllers/authController");

router.post("/signup", validateSignup, signup);
router.post("/login", login);

module.exports = router;