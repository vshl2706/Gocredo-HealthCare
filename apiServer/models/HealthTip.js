const mongoose = require("mongoose");

const healthTipSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    category: { type: String, default: "general" },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("HealthTip", healthTipSchema);
