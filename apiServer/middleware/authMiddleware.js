module.exports = (req, res, next) => {
  const { email, password, confirmPassword, firstName, secondName, age, phoneNumber } = req.body;

  if (!email || !password || !confirmPassword || !firstName || !secondName || !age || !phoneNumber) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Password and Confirm Password do not match" });
  }

  next();
};
