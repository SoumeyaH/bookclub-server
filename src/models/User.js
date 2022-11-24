const { Schema, model } = require("mongoose");
const { isEmail } = require("validator");

//TODO figure out why import from index returns undefined? circular dependency?
const { hashPassword, loginUser } = require("../utils/userRelated");

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

userSchema.pre("save", hashPassword);

userSchema.statics.login = loginUser;

const User = new model("User", userSchema);

module.exports = User;
