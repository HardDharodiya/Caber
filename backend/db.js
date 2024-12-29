const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://rohangorvadia:rohangorvadia@cluster0.fe754.mongodb.net/Caber"
);

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

const User = mongoose.model("user", userSchema);
const Vehicle = mongoose.model("vehicle", vehicleSchema);

module.exports = {
  User,
  Vehicle,
};
