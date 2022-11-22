const { User } = require("../models");

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.create({ username, email, password });

    res.status(201).json({
      username: user.username,
    });
  } catch (err) {
    console.log(err.message);
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

const login = (req, res) => {
  res.json({ message: "login" });
};

module.exports = {
  signup,
  login,
};
