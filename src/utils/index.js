const { hashPassword, createToken, loginUser } = require("./userRelated");

const { protected } = require("./tokenAuth");

module.exports = { hashPassword, createToken, loginUser, protected };
