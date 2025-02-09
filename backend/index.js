const express = require("express");
const cors = require("cors");
const app = express();
const mainRouter = require("./routes/index");
const connectMongoDB = require("./db");

connectMongoDB();
app.use(cors());
app.use(express.json());

app.use("/api", mainRouter);
app.listen(3000);
