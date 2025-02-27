const express = require("express");
const userRouter = express.Router();
const User = require("../models/user");
const { authMiddleware } = require("../middlewares");
const { signup, login } = require("../controls/auth");
const {
  addVehicle,
  getVehicle,
  removeVehicle,
  getVehicleById,
} = require("../controls/vehicle");
const { verifyOTP, reqOTP, changePassword } = require("../controls/verifyAuth");

userRouter.post("/auth/signup", signup);
userRouter.post("/auth/login", login);
userRouter.post("/sendOTP", reqOTP);
userRouter.post("/verifyOTP", verifyOTP);
userRouter.post("/changePassword", changePassword);
userRouter.post("/addVehicle", authMiddleware, addVehicle);
userRouter.get("/getVehicle", authMiddleware, getVehicle);
userRouter.get("/getVehicleById", authMiddleware, getVehicleById);
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

userRouter.get("/getById", authMiddleware, async (req, res) => {
  try {
    const users = req.userId;
    const user = await User.findOne({ _id: users });
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
