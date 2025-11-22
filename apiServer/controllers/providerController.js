const User = require("../models/User");
const DailyLog = require("../models/DailyLog");

const getPatientsOverview = async (req, res) => {
  const patients = await User.find({ role: "patient" }).select(
    "name email goals"
  );

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const logs = await DailyLog.find({
    date: { $gte: today },
  }).populate("patient", "email");

  const compliance = patients.map((p) => {
    const log = logs.find((l) => String(l.patient._id) === String(p._id));
    const isCompliant = !!log; // simple MVP logic

    const preventiveOverdue = false; // placeholder

    return {
      id: p._id,
      name: p.name,
      email: p.email,
      compliantToday: isCompliant,
      preventiveOverdue,
    };
  });

  res.json(compliance);
};

module.exports = { getPatientsOverview };
