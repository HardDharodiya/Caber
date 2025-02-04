const express = require("express");
const router = express.Router();
const userRouter = require("./user");
const routeRouter = require("./route");

router.use("/user", userRouter);
router.use("/route", routeRouter);

module.exports = router;
