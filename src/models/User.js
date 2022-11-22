const { Schema, model } = require("mongoose");
const { isEmail } = require("validator");

const schema = {
  username: {
    type: String,
    required: [true, "Please enter a username."],
    unique: true,
    lowercase: true,
    immutable: true,
    minLength: [4, "Minimum username length is 5 characters."],
  },
  email: {
    type: String,
    required: [true, "Please enter an email address."],
    unique: true,
    lowercase: true,
    immutable: true,
    validate: [isEmail, "Please enter a valid email address."],
  },
  password: {
    type: String,
    required: [true, "Please enter a password."],
    minLength: [8, "Minimum username length is 8 characters."],
  },
};

const userSchema = new Schema(schema, {
  timestamps: true,
});

const User = new model("User", userSchema);

module.exports = User;
