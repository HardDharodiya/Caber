const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 100,
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
  licenseNumber: {
    type: String,
    minLength: 4,
    maxLength: 20,
  },
  isCaptain: {
    type: Boolean,
    required: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("User", userSchema);
