const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
require("./config/db"); // connect to Mongo

const authRoutes = require("./routes/authRoutes");
const patientRoutes = require("./routes/patientRoutes");
const providerRoutes = require("./routes/providerRoutes");
const publicRoutes = require("./routes/publicRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/patient", patientRoutes);
app.use("/api/provider", providerRoutes);
app.use("/api/public", publicRoutes);
app.use("/api/notifications", notificationRoutes);

app.get("/", (req, res) => res.send("Gocredo HealthCare API running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
