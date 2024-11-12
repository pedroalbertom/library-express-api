const router = require("express").Router();
const controller = require("../src/controllers/eventTypeController");

router.post("/", controller.create);
router.get("/", controller.list);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

module.exports = router;
