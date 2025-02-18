const mongoose = require("mongoose");

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
  origin: [
    {
      type: Number,
      required: true,
    },
    {
      type: Number,
      required: true,
    },
  ],
  destination: [
    {
      type: Number,
      required: true,
    },
    {
      type: Number,
      required: true,
    },
  ],
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
    // required: true,
  },
  time: {
    type: String,
    // required: true,
  },
  status: {
    type: String,
    // required: true,
  },
});

module.exports = mongoose.model("Route", routeSchema);
