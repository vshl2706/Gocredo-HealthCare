const bcrypt = require("bcryptjs");
const { createToken } = require("../utils/jwt");
const User = require("../models/User");
const AuditLog = require("../models/AuditLog");

const signup = async (req, res) => {
  try {
    const { name, email, password, role, consentGiven } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: "Email already used" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
      role: role || "patient",
      consentGiven,
    });

    await AuditLog.create({
      user: user._id,
      action: "SIGNUP",
      ip: req.ip,
      userAgent: req.get("user-agent"),
    });

    const token = createToken({ id: user._id, role: user.role });

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Signup failed" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      user.failedLoginCount += 1;
      if (user.failedLoginCount >= 5) user.accountWarning = true;
      await user.save();

      await AuditLog.create({
        user: user._id,
        action: "LOGIN_FAILED",
        ip: req.ip,
        userAgent: req.get("user-agent"),
      });

      return res.status(401).json({ message: "Invalid credentials" });
    }

    user.failedLoginCount = 0;
    await user.save();

    await AuditLog.create({
      user: user._id,
      action: "LOGIN_SUCCESS",
      ip: req.ip,
      userAgent: req.get("user-agent"),
    });

    const token = createToken({ id: user._id, role: user.role });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        accountWarning: user.accountWarning,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
};

module.exports = { signup, login };
