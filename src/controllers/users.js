const { User } = require("../models");
const { createToken } = require("../utils");

const checkUsernameAvailability = async (username) => {
  const user = await User.findOne({ username });
  if (user) throw Error("This username already exists");
};

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    await checkUsernameAvailability(username);
    const user = await User.create({ username, email, password });
    const token = createToken(user._id);

    console.log("PASSWORD", user);
    res.status(201).json({
      username: user.username,
      token,
      userId: user._id,
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
