const express = require("express");
const userRouter = express.Router();
const zod = require("zod");
const { User, Vehicle } = require("../db");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");

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

userRouter.post("/signup", async (req, res) => {
  const body = req.body;
  const success = signupSchema.safeParse(body);

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
    JWT_SECRET
  );

  console.log("token when adding new user in db");
  console.log(token);

  res.status(200).json({
    message: "User created successfully..",
    token: token,
  });
});

userRouter.post("/signin", async (req, res) => {
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
      JWT_SECRET
    );

    return res.status(200).json({
      message: "Logged in successfully",
      token: token,
    });
  }

  return res.status(400).json({
    message: "Error while Logging in",
  });
});

module.exports = userRouter;
