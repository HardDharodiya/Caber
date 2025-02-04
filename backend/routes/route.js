const express = require("express");
const routeRouter = express.Router();
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { authMiddleware } = require("../middlewares");
const Route = require("../models/route");
const Vehicle = require("../models/vehicle");
const User = require("../models/user");

const routeSchema = zod.object({
  source: zod.string(),
  destination: zod.string(),
  cost: zod.number(),
  date: zod.string(),
  time: zod.string(),
  status: zod.string(),
});

routeRouter.post("/create", authMiddleware, async (req, res) => {
  try {
    const body = req.body;
    const success = routeSchema.safeParse(body);
    const vehicleId = await Vehicle.findOne({
      userId: req.userId,
    });

    if (!success) {
      return res.status(400).json({
        message: "Invalid input",
      });
    }
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

    await Route.create({
      driverId: req.userId,
      vehicleId: vehicleId,
      source: body.source,
      destination: body.destination,
      cost: body.cost,
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
});

routeRouter.get("/get", authMiddleware, async (req, res) => {
  try {
    const routes = await Route.find({
      userId: req.userId,
    });

    res.status(200).json({
      routes,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

routeRouter.get("/getall", authMiddleware, async (req, res) => {
  try {
    const routes = await Route.find();

    res.status(200).json({
      routes,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

routeRouter.post("/addPassenger", authMiddleware, async (req, res) => {
  try {
    const body = req.body;
    const routeId = body.routeId;
    if (!routeId) {
      return res.status(400).json({ message: "Route ID is required" });
    }
    if (!(await Route.exists({ _id: routeId }))) {
      return res.status(400).json({ message: "Route not found" });
    }
    if (await Route.exists({ _id: routeId, passengers: req.userId })) {
      return res.status(400).json({ message: "You are already a passenger" });
    }

    const updatedRoute = await Route.findByIdAndUpdate(
      routeId,

      { $addToSet: { passengers: req.userId } }, // Prevents duplicates
      { new: true, upsert: true } // Returns updated document and creates if missing
    );
    res.status(200).json({ updatedRoute });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
module.exports = routeRouter;
