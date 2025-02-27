const mongoose = require("mongoose");

const routeSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  vehicleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehicle",
  },
  origin: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  distance: {
    type: Number,
    required: true,
  },
  originCoords: [
    {
      type: Number,
      required: true,
    },
    {
      type: Number,
      required: true,
    },
  ],
  destinationCoords: [
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
