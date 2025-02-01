const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
console.log("MongoDB URI:", process.env.MONGO_URL);

mongoose.connect(process.env.MONGO_URL);

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 20,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  firstName: {
    type: String,
    required: true,
    maxLength: 20,
  },
  lastName: {
    type: String,
    required: true,
    maxLength: 30,
  },
  isCaptain: {
    type: Boolean,
    required: true,
  },
});

const vehicleSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  vehicleType: {
    type: String,
    required: true,
  },
  vehicleNumber: {
    type: String,
    required: true,
  },
  // vehicleModel: {
  //   type: String,
  //   required: true,
  // },
  vehicleColor: {
    type: String,
    required: true,
  },
  vehicleCapacity: {
    type: Number,
    required: true,
    minLength: 1,
    maxLength: 30,
  },
});

const routeSchema = mongoose.Schema({
  driverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  vehicleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehicle",
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  passengers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  cost: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("user", userSchema);
const Vehicle = mongoose.model("vehicle", vehicleSchema);
const Route = mongoose.model("route", routeSchema);

module.exports = {
  User,
  Vehicle,
  Route,
};
