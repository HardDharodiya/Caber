const express = require("express");
const userRouter = express.Router();
const zod = require("zod");
const User = require("../models/user");
const Vehicle = require("../models/vehicle");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { authMiddleware } = require("../middlewares");
dotenv.config({ path: "../.env" });

const signupSchema = zod.object({
  email: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
});

const signinSchema = zod.object({
  email: zod.string().email(),
  password: zod.string(),
  isCaptain: zod.boolean(),
});

const vehicleSchema = zod.object({
  vehicleType: zod.string(),
  vehicleNumber: zod.string(),
  // vehicleModel: zod.string(),
  vehicleColor: zod.string(),
  vehicleCapacity: zod.number(),
});

userRouter.post("/signup", async (req, res) => {
  try {
    const body = req.body;
    const success = signupSchema.safeParse(body);
    const vehicleSuccess = vehicleSchema.safeParse(body);

    if (!success) {
      return res.status(400).json({
        message: "Invalid Input",
      });
    }

    const existingUser = await User.findOne({
      email: body.email,
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Email / User already exist",
      });
    }

    const user = await User.create(body);
    const userId = user._id;

    if (body.isCaptain) {
      if (!vehicleSuccess) {
        return res.status(400).json({
          message: "Invalid vehicle input",
        });
      }
      await Vehicle.create({
        userId: userId,
        vehicleType: body.vehicleType,
        vehicleNumber: body.vehicleNumber,
        vehicleModel: body.vehicleModel,
        vehicleColor: body.vehicleColor,
        vehicleCapacity: body.vehicleCapacity,
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET
    );

    console.log("token when adding new user in db");
    console.log(token);

    res.status(200).json({
      message: "User created successfully..",
      token: token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

userRouter.post("/signin", async (req, res) => {
  try {
    const success = signinSchema.safeParse(req.body);

    if (!success) {
      return res.status(400).json({
        message: "Email already taken / Invalid input",
      });
    }

    const existingUser = await User.findOne({
      email: req.body.email,
      password: req.body.password,
      isCaptain: req.body.isCaptain,
    });

    if (existingUser) {
      const token = jwt.sign(
        {
          userId: existingUser._id,
        },
        process.env.JWT_SECRET
      );

      return res.status(200).json({
        message: "Logged in successfully",
        token: token,
      });
    }

    return res.status(400).json({
      message: "Error while Logging in",
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

userRouter.get("/getProfile", authMiddleware, async (req, res) => {
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

userRouter.post("/addVehicle", authMiddleware, async (req, res) => {
  try {
    const body = req.body;
    const success = vehicleSchema.safeParse(body);

    if (!success) {
      return res.status(400).json({
        message: "Invalid Input",
      });
    }

    const vehicle = await Vehicle.create({
      userId: req.userId,
      vehicleType: body.vehicleType,
      vehicleNumber: body.vehicleNumber,
      vehicleColor: body.vehicleColor,
      vehicleCapacity: body.vehicleCapacity,
    });

    res.status(200).json({
      message: "Vehicle added successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

userRouter.get("/getVehicle", authMiddleware, async (req, res) => {
  try {
    const vehicles = await Vehicle.find({ userId: req.userId });
    res.status(200).json({
      vehicles,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

module.exports = userRouter;
