const express = require("express");
const router = express.Router();

router.use("/user", require("./userRoutes"));
router.use("/book", require("./bookRoutes"));
router.use("/comment", require("./commentRoutes"));

module.exports = router;

