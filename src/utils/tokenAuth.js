const jwt = require("jsonwebtoken");
const { User } = require("../models");

const protected = async (req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer")
  ) {
    res.status(401).json({ message: "No token. User not authorized" });
    throw new Error("No token. User not authorized");
  }

  try {
    const token = req.headers.authorization.split(" ")[1];

    // TODO jwt secret in one location dotenv

    const { id } = jwt.verify(token, "nobody knows the secret");

    req.user = await User.findById(id).select("-password");

    next();
  } catch (err) {
    res.status(401).json({ message: "User not authorized" });
    throw new Error("User not authorized");
  }
};

module.exports = { protected };
