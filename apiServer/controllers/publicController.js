const HealthTip = require("../models/HealthTip");

const getPublicInfo = async (req, res) => {
  const tip = await HealthTip.findOne({ active: true }).sort({ createdAt: -1 });

  res.json({
    about:
      "Gocredo HealthCare portal helps patients track wellness goals and providers monitor preventive care.",
    privacy:
      "We follow HIPAA-conscious best practices with minimal data collection, consent, and encrypted storage.",
    healthTip: tip?.text || "Walk a few minutes every hour to stay active.",
  });
};

module.exports = { getPublicInfo };
