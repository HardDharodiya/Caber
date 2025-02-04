const mongoose = require("mongoose");

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

module.exports = mongoose.model("User", userSchema);
