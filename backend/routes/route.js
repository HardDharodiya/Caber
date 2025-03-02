const express = require("express");
const routeRouter = express.Router();
const { authMiddleware } = require("../middlewares");
const Route = require("../models/route");
const User = require("../models/user");
const { default: mongoose } = require("mongoose");
const {
  get,
  create,
  getAll,
  getById,
  bulk,
  removeRoute,
} = require("../controls/route");
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
    console.log("routeId", routeId);
    // console.log(vehicleId);

    if (!routeId) {
      return res.status(400).json({ message: "Route ID is required" });
    }
    if (!(await Route.exists({ _id: routeId }))) {
      return res.status(404).json({ message: "Route not found" });
    }
    if (await Route.exists({ _id: routeId, passenger: req.userId })) {
      return res.status(400).json({ message: "You are already a passenger" });
    }

    session.startTransaction();
    let to = await Route.findOne({ _id: routeId })
      .select("driverId")
      .session(session);
    let amount = await Route.findOne({ _id: routeId })
      .select("cost")
      .session(session);
    amount = amount.cost;
    to = to.driverId;
    console.log("to:" + to);
    console.log("amount:" + amount);
    const from = await User.findById(req.userId).session(session);
    console.log("from" + from);
    console.log("from.balance" + from.balance);
    if (!from || from.balance < amount) {
      await session.abortTransaction();
      return res.status(402).json({ message: "Insufficient balance" });
    }

    await User.updateOne(
      { _id: from },
      { $inc: { balance: -amount } },
      { session }
    );

    await User.updateOne(
      { _id: to },
      { $inc: { balance: +amount } },
      { session }
    );

    await session.commitTransaction();
    console.log("Transaction completed");

    const updatedRoute = await Route.findOne({ _id: routeId }).updateMany({
      passenger: req.userId,
      status: "accepted",
    });
    console.log("updatedRoute", updatedRoute);
    res.status(200).json({ msg: "Ride booked successfully!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

routeRouter.get("/bookedRides", authMiddleware, async (req, res) => {
  try {
    const response = await removeRoute(req, res);
    if (response) {
      console.log("booked route cant be deleted due to some problem");
    } else {
      console.log("booked route is deleted");
    }
    const routes = await Route.find({ passenger: req.userId });
    const ridesWithDriverNames = await Promise.all(
      routes.map(async (route) => {
        if (route.passenger) {
          const user = await User.findById(route.driverId).select(
            "firstName lastName email"
          );
          const vehicle = await Vehicle.findById(route.vehicleId).select(
            "vehicleNumber"
          );
          console.log("user", user);
          return {
            ...route.toObject(),
            driverName: user ? `${user.firstName} ${user.lastName} ` : "N/A",
            driverEmail: user ? user.email : "N/A",
            vehicleNumber: vehicle ? vehicle.vehicleNumber : "N/A",
          };
        }
        return {
          ...route.toObject(),
          driverName,
          driverEmail,
          vehicleNumber: "N/A",
        };
      })
    );
    return res.status(200).json({ routes: ridesWithDriverNames });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

routeRouter.post("/finishRoute", authMiddleware, async (req, res) => {
  try {
    const routeId = req.body.routeId;
    console.log("routeId", routeId);
    const route = await Route.findOneAndUpdate(
      {
        _id: routeId,
      },
      {
        status: "Finished",
      }
    );
    if (route) {
      return res.status(200).json({ message: "Ride finished successfully!" });
    } else {
      res.status(404).json({ message: "route not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = routeRouter;
