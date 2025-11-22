const validateSignup = (req, res, next) => {
  const { name, email, password, consentGiven } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: "Missing required fields" });

  if (!consentGiven)
    return res
      .status(400)
      .json({ message: "You must provide consent to create an account" });

  next();
};

module.exports = { validateSignup };
