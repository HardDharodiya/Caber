const Vehicle = require("../models/vehicle");
const zod = require("zod");

const vehicleSchema = zod.object({
  vehicleType: zod.string(),
  vehicleNumber: zod.string(),
  // vehicleModel: zod.string(),
  vehicleColor: zod.string(),
  vehicleCapacity: zod.number(),
});

const addVehicle = async (req, res) => {
  try {
    const body = req.body;
    const success = vehicleSchema.safeParse(body);
    const vehicleExists = await Vehicle.findOne({
      userId: req.userId,
    });
    if (vehicleExists) {
      return res.status(400).json({
        message: "You can only have one vehicle at a time",
      });
    }
    if (!success) {
      return res.status(400).json({
        message: "Invalid Input",
      });
    }

    await Vehicle.create({
      userId: req.userId,
      vehicleType: body.vehicleType,
      vehicleNumber: body.vehicleNumber,
      vehicleColor: body.vehicleColor,
      vehicleCapacity: body.vehicleCapacity,
    });
    res.status(200).json({
      message: "Vehicle added successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const getVehicle = async (req, res) => {
  try {
    const vehicles = await Vehicle.find({ userId: req.userId });
    if (!vehicles) {
      return res.status(400).json({
        message: "No vehicles found",
      });
    }
    res.status(200).json({
      vehicles,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const getVehicleById = async (req, res) => {
  const vehicleId = req.body.vehicleId;
  const vehicle = await Vehicle.findOne({ _id: vehicleId });
  if (!vehicle) {
    return res.status(400).json({
      message: "Vehicle not found",
    });
  }
  res.status(200).json({
    vehicle,
  });
};

const removeVehicle = async (req, res) => {
  try {
    const vehicleId = req.query.vehicleId;
    if (!vehicleId) {
      return res.status(400).json({
        message: "Vehicle ID is required",
      });
    }
    await Vehicle.findOneAndDelete({ _id: vehicleId });
    res.status(200).json({
      message: "Vehicle removed successfully",
    });
  } catch {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = { addVehicle, getVehicle, getVehicleById, removeVehicle };
