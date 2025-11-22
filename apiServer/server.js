const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const connectDb = require("./config/db");

dotenv.config();

const app = express();

// Connect DB
connectDb();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
const authRoutes = require("./routes/authRoutes");

app.use("/api/v1/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Healthcare API running" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
