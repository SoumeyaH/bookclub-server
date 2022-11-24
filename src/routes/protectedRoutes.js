const { Router } = require("express");

const { deleteUser } = require("../controllers");

const router = Router();

router.delete("/api/user/:id", deleteUser);

module.exports = router;
