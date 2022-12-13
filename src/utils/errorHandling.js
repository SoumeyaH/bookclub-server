const userErrorHandler = (err) => {
  let errors = { username: "", email: "", password: "" };

  if (err.message === "username exists")
    errors.username = "This username is already in use.";

  if (err.message === "incorrect username")
    errors.username = "This username is incorrect.";

  if (err.message === "incorrect email")
    errors.email = "This email is incorrect.";

  if (err.message === "incorrect password")
    errors.password = "This password is incorrect.";

  //duplicated email error
  if (err.code === 11000)
    errors.email = "This email address is already in use.";

  //validation error
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

module.exports = { userErrorHandler };
