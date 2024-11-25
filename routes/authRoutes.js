const router = require("express").Router();
const controller = require("../src/controllers/authController");
const { authenticateToken } = require("../src/middlewares/auth");

router.post("/login", controller.login);
router.post("/logout", authenticateToken, controller.logout);
router.post("/register", authenticateToken, controller.register);
router.post("/forgot", controller.forgotPass);
router.post("/recover", controller.resetPass);

module.exports = router;