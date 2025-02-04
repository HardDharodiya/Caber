const mongoose = require("mongoose");

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

module.exports = mongoose.model("Vehicle", vehicleSchema);
