const router = require("express").Router();
const controller = require("../src/controllers/commentController");
const { authenticateToken } = require("../src/middlewares/auth");

router.post("/", authenticateToken, controller.create);
router.get("/", controller.list);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

module.exports = router;
