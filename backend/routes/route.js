const express = require("express");
const routeRouter = express.Router();
const { authMiddleware } = require("../middlewares");
const Route = require("../models/route");
const User = require("../models/user");
const { default: mongoose } = require("mongoose");
const { get, create, getAll, getById, bulk } = require("../controls/route");
const Vehicle = require("../models/vehicle");

routeRouter.post("/create", authMiddleware, create);
routeRouter.get("/get", authMiddleware, get);
routeRouter.get("/bulk", authMiddleware, bulk);
routeRouter.get("/getAll", authMiddleware, getAll);
routeRouter.get("/getById", authMiddleware, getById);

routeRouter.post("/addPassenger", authMiddleware, async (req, res) => {
  try {
    const session = await mongoose.startSession();
    const body = req.body;
    const routeId = await Route.findOne({ _id: body.routeId });
    console.log(routeId);
    // console.log(vehicleId);
    const maxPassengers = await Vehicle.findOne({
      _id: routeId.vehicleId,
    });

    console.log(maxPassengers);
    if (maxPassengers.vehicleCapacity <= routeId.passengers.length) {
      return res.status(400).json({ message: "Vehicle is full" });
    }
    if (!routeId) {
      return res.status(400).json({ message: "Route ID is required" });
    }
    if (!(await Route.exists({ _id: routeId }))) {
      return res.status(400).json({ message: "Route not found" });
    }
    if (await Route.exists({ _id: routeId, passengers: req.userId })) {
      return res.status(400).json({ message: "You are already a passenger" });
    }

    session.startTransaction();
    const to = await Route.findOne({ _id: routeId })
      .select("driverId")
      .session(session);
    const amount = await Route.findOne({ _id: routeId })
      .select("cost")
      .session(session);

    console.log("to:" + to);
    console.log("amount:" + amount);
    const from = await User.findById(req.userId).session(session);
    console.log("from" + from);
    if (!from || from.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Insufficient balance" });
    }

    await User.updateOne(
      { _id: from },
      { $inc: { balance: -amount.cost } },
      { session }
    );

    await User.updateOne(
      { _id: to.driverId },
      { $inc: { balance: +amount.cost } },
      { session }
    );

    await session.commitTransaction();
    console.log("Transaction completed");

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

routeRouter.post("/acceptRoute", authMiddleware, async (req, res) => {
  try {
    const routeId = req.body.routeId;
    const route = await Route.findOne({ _id: routeId });
    if (!route) {
      return res.status(400).json({ message: "Route not found" });
    }
    const updatedRoute = await Route.findByIdAndUpdate(
      routeId,
      { status: "accepted" },
      { new: true }
    );
    res.status(200).json({ msg: "Route accepted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = routeRouter;
