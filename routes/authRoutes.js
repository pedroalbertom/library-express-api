const router = require("express").Router();
const controller = require("../src/controllers/authController");
const { authenticateToken } = require("../src/middlewares/auth");

router.post("/login", controller.login);
router.post("/logout", authenticateToken, controller.logout);
router.post("/register", controller.register);

module.exports = router;