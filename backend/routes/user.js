const express = require("express");
const userRouter = express.Router();
const User = require("../models/user");
const dotenv = require("dotenv");
const { authMiddleware } = require("../middlewares");
const { signup, login } = require("../controls/auth");
const {
  addVehicle,
  getVehicle,
  removeVehicle,
} = require("../controls/vehicle");
const { verifyOTP, reqOTP } = require("../controls/verifyAuth");
dotenv.config({ path: "../.env" });

userRouter.post("/auth/signup", signup);
userRouter.post("/auth/login", login);
userRouter.post("/sendOTP", reqOTP);
userRouter.post("/verifyOTP", verifyOTP);
userRouter.post("/addVehicle", authMiddleware, addVehicle);
userRouter.get("/getVehicle", authMiddleware, getVehicle);
userRouter.get("/removeVehicle", authMiddleware, removeVehicle);

userRouter.get("/getUser", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.userId });
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    res.status(200).json({
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});
userRouter.get("/getCaptain", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.userId }).select("isCaptain");
    if (!user) {
      return res.status(400).json({
        message: "not found",
      });
    }
    res.status(200).json({
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});
userRouter.post("/toggleCaptain", authMiddleware, async (req, res) => {
  try {
    if (!req.body.isCaptain) {
      return res.status(400).json({
        message: "IsCaptain field is required",
      });
    }

    const user = await User.findOneAndUpdate(
      { _id: req.userId },
      { $set: { isCaptain: req.body.isCaptain } },
      { new: true }
    );
    // console.log("thins" + user);
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    res.status(200).json({
      message: "Captain status updated successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

userRouter.post("/addMoney", authMiddleware, async (req, res) => {
  try {
    const amount = req.body.amount;
    if (!amount) {
      return res.status(400).json({
        message: "Amount is required",
      });
    }
    await User.updateOne({ _id: req.userId }, { $inc: { balance: amount } });
    res.status(200).json({
      message: "Money added successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

module.exports = userRouter;
