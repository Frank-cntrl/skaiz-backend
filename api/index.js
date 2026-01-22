const express = require("express");
const router = express.Router();
const testDbRouter = require("./test-db");
const countdownRouter = require("./countdown");

router.use("/test-db", testDbRouter);
router.use("/countdown", countdownRouter);

module.exports = router;
