const express = require("express");
const router = express.Router();

router.use("/admin", require("./adminRoutes"));
router.use("/employee", require("./employeeRoutes"));
router.use("/event", require("./eventRoutes"));
router.use("/eventtype", require("./eventTypeRoutes"));
router.use("/item", require("./itemRoutes"));
router.use("/itemtype", require("./itemTypeRoutes"));
router.use("/locker", require("./lockerRoutes"));
router.use("/status", require("./statusRoutes"));

module.exports = router;

