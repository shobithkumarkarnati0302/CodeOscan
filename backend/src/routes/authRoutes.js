const { Router } = require("express");
const { login, me, register } = require("../controllers/authController");

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", me);

module.exports = router;
