const Route = require("../models/route");
const Vehicle = require("../models/vehicle");
const User = require("../models/user");
const { getLatLng, getCost, getDistanceAndTime } = require("./cost");

const create = async (req, res) => {
  try {
    const body = req.body;
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

    const vehicleId = await Vehicle.findOne({
      userId: req.userId,
    });
    const vehicleType = vehicleId.vehicleType;
    console.log("vehicleType: ", vehicleType);

    console.log(req.userId);

    const existingRoute = await Route.findOne({
      driverId: req.userId,
      origin: body.source,
      destination: body.destination,
      date: body.date,
      time: body.time,
    });

    if (existingRoute) {
      return res.status(400).json({
        message: "You have already created a route for this time",
      });
    }
    const { lat: originLat, lng: originLng } = await getLatLng(body.source);
    const { lat: destinationLat, lng: destinationLng } = await getLatLng(
      body.destination
    );
    const cost = await getCost({
      originLat,
      originLng,
      destinationLat,
      destinationLng,
      vehicleType,
    });
    const distanceTime = await getDistanceAndTime({
      originLat,
      originLng,
      destinationLat,
      destinationLng,
      vehicleType,
    });
    const distance = distanceTime.distance.value / 1000;
    await Route.create({
      driverId: req.userId,
      origin: body.source,
      destination: body.destination,
      cost: cost,
      vehicleId: vehicleId._id,
      date: body.date,
      time: body.time,
      status: body.status,
      distance: distance,
    });
    const routeId = await Route.findOne({
      driverId: req.userId,
      origin: body.source,
      destination: body.destination,
    }).select("_id");

    res.status(201).json({
      routeId: routeId,
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
    const routes = await Route.find();
    res.status(200).json({
      routes,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const bulk = async (req, res) => {
  try {
    const origin = req.query.origin || "";
    const destination = req.query.destination || "";

    const routes = await Route.find({
      $and: [
        {
          origin: {
            $regex: origin,
          },
        },
        {
          destination: {
            $regex: destination,
          },
        },
        {
          status: {
            $regex: "pending",
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

module.exports = { create, get, getAll, bulk, getById };
