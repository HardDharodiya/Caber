const Route = require("../models/route");
const Vehicle = require("../models/vehicle");
const User = require("../models/user");
const { getLatLng, getCost } = require("./cost");

const create = async (req, res) => {
  try {
    const body = req.body;
    const vehicleId = await Vehicle.findOne({
      userId: req.userId,
    });
    const vehicleType = await Vehicle.findOne({
      _id: vehicleId,
    }).select("vehicleType");

    console.log(req.userId);
    const isCaptain = await User.findOne({
      _id: req.userId,
      isCaptain: true,
    });
    console.log(isCaptain);

    if (!isCaptain) {
      return res.status(403).json({
        message: "To create a route you need to be a captain",
      });
    }

    const existingRoute = await Route.findOne({
      userId: req.userId,
      date: body.date,
      time: body.time,
    });

    if (existingRoute) {
      return res.status(400).json({
        message: "You have already created a route for this time",
      });
    }
    const { lat: originLat, lng: originLng } = await getLatLng(body.source);
    console.log("origin: ", originLat, originLng);
    const { lat: destinationLat, lng: destinationLng } = await getLatLng(
      body.destination
    );
    console.log("destination: ", destinationLat, destinationLng);
    const cost = await getCost({
      originLat,
      originLng,
      destinationLat,
      destinationLng,
      vehicleType,
    });

    await Route.create({
      driverId: req.userId,
      vehicleId: vehicleId,
      origin: body.source,
      destination: body.destination,
      originCoords: [originLat, originLng],
      destinationCoords: [destinationLat, destinationLng],
      cost: cost,
      date: body.date,
      time: body.time,
      status: body.status,
    });
    const routeId = await Route.findOne({
      driverId: req.userId,
      date: body.date,
      time: body.time,
    }).select("_id");

    res.status(201).json({
      routeId,
      message: "Route created successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const get = async (req, res) => {
  try {
    const routes = await Route.find({
      driverId: req.userId,
    });

    res.status(200).json({
      routes,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAll = async (req, res) => {
  try {
    const filter = req.query.filter || "";
    const routes = await Route.find({
      $or: [
        {
          origin: {
            $regex: filter,
          },
        },
        {
          destination: {
            $regex: filter,
          },
        },
      ],
    });
    res.json({ routes });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getById = async (req, res) => {
  try {
    const routeId = req.body.routeId;
    const route = await Route.findOne({ _id: routeId });
    if (!route) {
      return res.status(400).json({ message: "Route not found" });
    }
    res.status(200).json({ route });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { create, get, getAll , getById};
