const DailyLog = require("../models/DailyLog");
const HealthTip = require("../models/HealthTip");
const Notification = require("../models/Notification");

const getDashboard = async (req, res) => {
  const user = req.user;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const log = await DailyLog.findOne({
    patient: user._id,
    date: { $gte: today },
  });

  const tip = await HealthTip.findOne({ active: true }).sort({ createdAt: -1 });

  const preventiveReminders = [
    "Annual health checkup due in 30 days",
    "Blood test due in 10 days",
  ]; // simple static for MVP

  res.json({
    goals: user.goals,
    todayLog: log,
    preventiveReminders,
    healthTip: tip?.text || "Stay hydrated and get enough sleep 💧😴",
  });
};

const addDailyLog = async (req, res) => {
  const user = req.user;
  const { steps, waterIntake, sleepHours, yogaMinutes } = req.body;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let log = await DailyLog.findOne({
    patient: user._id,
    date: { $gte: today },
  });

  if (!log) {
    log = await DailyLog.create({
      patient: user._id,
      date: today,
      steps,
      waterIntake,
      sleepHours,
      yogaMinutes,
    });
  } else {
    log.steps = steps ?? log.steps;
    log.waterIntake = waterIntake ?? log.waterIntake;
    log.sleepHours = sleepHours ?? log.sleepHours;
    log.yogaMinutes = yogaMinutes ?? log.yogaMinutes;
    await log.save();
  }

  const goals = user.goals;
  const targetMet =
    (steps || 0) >= (goals.steps || 0) &&
    (waterIntake || 0) >= (goals.waterIntake || 0) &&
    (sleepHours || 0) >= (goals.sleepHours || 0);

  if (!targetMet) {
    await Notification.create({
      user: user._id,
      type: "GOAL_WARNING",
      message: "Daily wellness targets not fully completed.",
    });
  }

  res.status(200).json({ log, targetMet });
};

const getProfile = (req, res) => {
  const user = req.user;
  res.json({
    name: user.name,
    email: user.email,
    age: user.age,
    allergies: user.allergies,
    medications: user.medications,
    chronicConditions: user.chronicConditions,
    goals: user.goals,
  });
};

const updateProfile = async (req, res) => {
  const user = req.user;
  const { age, allergies, medications, chronicConditions, goals } = req.body;

  if (age !== undefined) user.age = age;
  if (allergies) user.allergies = allergies;
  if (medications) user.medications = medications;
  if (chronicConditions) user.chronicConditions = chronicConditions;
  if (goals) user.goals = { ...user.goals, ...goals };

  await user.save();

  res.json({ message: "Profile updated" });
};

module.exports = {
  getDashboard,
  addDailyLog,
  getProfile,
  updateProfile,
};
