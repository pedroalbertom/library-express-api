const express = require("express");
const errorHandler = require("../src/middlewares/error");
const router = express.Router();

router.use("/user", require("./userRoutes"));
router.use("/auth", require("./authRoutes"));
router.use("/book", require("./bookRoutes"));
router.use("/comment", require("./commentRoutes"));

// setting the server to use the error handling middleware to handle all the erros on the API
router.use(errorHandler);

module.exports = router;

