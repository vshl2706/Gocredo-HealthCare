const Notification = require("../models/Notification");

const getMyNotifications = async (req, res) => {
  const notes = await Notification.find({ user: req.user._id }).sort({
    createdAt: -1,
  });
  res.json(notes);
};

module.exports = { getMyNotifications };
