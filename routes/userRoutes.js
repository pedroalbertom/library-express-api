const router = require("express").Router();
const controller = require("../src/controllers/userController");

router.get("/", controller.list);
router.get("/:id", controller.listOne);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

module.exports = router;
