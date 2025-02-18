const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const zod = require("zod");
const User = require("../models/user");
const Vehicle = require("../models/vehicle");
const { JWT_SECRET } = require("../config");

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

const signup = async (req, res) => {
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

    const hashedPassword = await bcrypt.hash(body.password, 10);
    const user = await User.create({
      email: body.email,
      firstName: body.firstName,
      lastName: body.lastName,
      password: hashedPassword,
      isCaptain: body.isCaptain,
      licenseNumber: body.licenseNumber,
    });

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
      JWT_SECRET
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
};

const login = async (req, res) => {
  try {
    const success = signinSchema.safeParse(req.body);

    if (!success) {
      return res.status(400).json({
        message: "Email already taken / Invalid input",
      });
    }

    const existingUser = await User.findOne({
      email: req.body.email,
      isCaptain: req.body.isCaptain,
    });

    console.log({ existingUser });
    bcrypt.compare(req.body.password, existingUser.password).then((matched) => {
      if (matched) {
        const token = jwt.sign({ userId: existingUser._id }, JWT_SECRET);
        return res.status(200).json({
          message: "Logged in successfully",
          token: token,
        });
      } else {
        return res.status(400).json({
          message: "Error while Logging in",
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = { signup, login };
