const { Router } = require("express");

const { signup, login } = require("../controllers");

const router = Router();

router.post("/api/signup", signup);
router.post("/api/login", login);

module.exports = router;
