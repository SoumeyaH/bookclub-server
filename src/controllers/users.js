const { User } = require("../models");
const { createToken } = require("../utils");
const { userErrorHandler } = require("../utils/errorHandling");

const checkUsernameAvailability = async (username) => {
  const user = await User.findOne({ username });
  if (user) throw Error("username exists");
};

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    await checkUsernameAvailability(username);
    const user = await User.create({ username, email, password });
    const token = createToken(user._id);

    res.status(201).json({
      username: user.username,
      token,
      userId: user._id,
    });
  } catch (err) {
    console.log(err.message);
    const errors = userErrorHandler(err);
    res.status(400).json({ errors });
  }
};

const login = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    console.log(username, email, password);
    const user = await User.login(username, email, password);
    const token = createToken(user._id);

    res.status(200).json({
      username: user.username,
      token,
      userId: user._id,
    });
  } catch (err) {
    console.log(err.message);
    const errors = userErrorHandler(err);
    res.status(400).json({ errors });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await User.findByIdAndDelete(id);

    res.status(200).json({ message: "Successfully deleted user" });
  } catch (err) {
    console.log(err.message, err);
  }
};

module.exports = {
  signup,
  login,
  deleteUser,
};
