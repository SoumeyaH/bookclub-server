const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const hashPassword = async function (next) {
  const salt = await bcrypt.genSalt();
  if (this.isNew || this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
};

const maxTokenAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, "nobody knows the secret", {
    expiresIn: maxTokenAge,
  });
};

const authorize = async (user, password) => {
  const authorized = await bcrypt.compare(password, user.password);
  if (!authorized) throw Error("This password is incorrect");
  return user;
};

const loginUser = async function (username, email, password) {
  if (username) {
    const user = await this.findOne({ username });
    if (!user) throw Error("This username incorrect ");
    return await authorize(user, password);
  }

  if (email) {
    const user = await this.findOne({ email });
    if (!user) throw Error("This email is incorrect");
    return await authorize(user, password);
  }

  // TODO error if neither passed
};

module.exports = { hashPassword, createToken, loginUser };
