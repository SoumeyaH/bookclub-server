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

module.exports = { hashPassword, createToken };
