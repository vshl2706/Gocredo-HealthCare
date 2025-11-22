const mongoose = require("mongoose");

const dailyLogSchema = new mongoose.Schema(
  {
    patient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, required: true },
    steps: Number,
    waterIntake: Number,
    sleepHours: Number,
    yogaMinutes: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("DailyLog", dailyLogSchema);
