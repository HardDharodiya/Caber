const mongoose = require("mongoose");
const { MONGO_URL } = require("./config");
console.log("MongoDB URI:", MONGO_URL);

mongoose.connect(MONGO_URL);

const connectMongoDB = () => {
  mongoose.connect(MONGO_URL);

  const db = mongoose.connection;

  db.on("error", (error) => {
    console.log("Error:" + error);
  });
  db.on("connected", () => {
    console.log("Connected to MongoDB");
  });
};

module.exports = connectMongoDB;
