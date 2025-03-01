const mongoose = require("mongoose");

const routeSchema = mongoose.Schema({
  driverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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
  passenger: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  cost: {
    type: Number,
    required: true,
  },
  dateTime: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Route", routeSchema);
