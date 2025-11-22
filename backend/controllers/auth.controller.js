const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { generateToken } = require("../utils/jwt");

// POST /api/auth/signup
const signup = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      age,
      mobile,
      password,
      confirmPassword,
      consentGiven,
    } = req.body;

    // 1) Basic validation
    if (
      !firstName ||
      !lastName ||
      !email ||
      !age ||
      !mobile ||
      !password ||
      !confirmPassword
    ) {
      return res
        .status(400)
        .json({ message: "All fields are required." });
    }

    if (!consentGiven) {
      return res.status(400).json({
        message:
          "You must consent to the privacy policy and HIPAA notice to create an account.",
      });
    }

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "Password and Confirm Password do not match." });
    }

    // 2) Check if email already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res
        .status(400)
        .json({ message: "An account with this email already exists." });
    }

    // 3) Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // 4) Create user (role = PATIENT for this form)
    const user = await User.create({
      firstName,
      lastName,
      email,
      age,
      mobile,
      passwordHash,
      role: "PATIENT",
      consentGiven: true,
      consentTimestamp: new Date(),
    });

    // 5) Generate JWT
    const token = generateToken(user);

    // 6) Send response
    res.status(201).json({
      message: "Account created successfully.",
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        fullName: `${user.firstName} ${user.lastName}`,
        email: user.email,
        age: user.age,
        mobile: user.mobile,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Signup error:", err);
    res
      .status(500)
      .json({ message: "Signup failed. Please try again later." });
  }
};

module.exports = { signup };
