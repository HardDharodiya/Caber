const express = require("express");
const routeRouter = express.Router();
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { authMiddleware } = require("../middlewares");
const { Vehicle, Route, User } = require("../db");

const routeSchema = zod.object({
  source: zod.string(),
  destination: zod.string(),
  cost: zod.number(),
  date: zod.string(),
  time: zod.string(),
  status: zod.string(),
});

routeRouter.post("/create", authMiddleware, async (req, res) => {
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
    userId: req.userId,
    vehicleId: vehicleId,
    source: body.source,
    destination: body.destination,
    cost: body.cost,
    date: body.date,
    time: body.time,
    status: body.status,
  });

  res.status(201).json({
    message: "Route created successfully",
  });
});

routeRouter.get("/get", authMiddleware, async (req, res) => {
  const routes = await Route.find({
    userId: req.userId,
  });

  res.status(200).json({
    routes,
  });
});

routeRouter.get("/getall", authMiddleware, async (req, res) => {
  const routes = await Route.find();

  res.status(200).json({
    routes,
  });
});

module.exports = routeRouter;
