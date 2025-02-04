const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
console.log("MongoDB URI:", process.env.MONGO_URL);

mongoose.connect(process.env.MONGO_URL);

const connectMongoDB = () => {
  mongoose.connect(process.env.MONGO_URL);

  const db = mongoose.connection;

  db.on("error", (error) => {
    console.log("Error:" + error);
  });
  db.on("connnected", () => {
    console.log("Connected to MongoDB");
  });
};

module.exports = connectMongoDB;
// Compare this snippet from backend/routes/user.js: