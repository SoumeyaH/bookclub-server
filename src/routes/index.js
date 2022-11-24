const { Router } = require("express");

const { protected } = require("../utils");

const { signup, login } = require("../controllers");
const protectedRoutes = require("./protectedRoutes");

const router = Router();

router.post("/api/signup", signup);
router.post("/api/login", login);

router.use(protected, protectedRoutes);

module.exports = router;
