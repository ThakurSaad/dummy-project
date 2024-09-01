const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const connectToDB = require("./config/db");

const userRoute = require("./routes/user.routes");
const formRoute = require("./routes/form.routes");

app.use("/api/v1/user", userRoute);
app.use("/api/v1/form", formRoute);

app.get("/", (req, res) => {
  res.status(200).json({
    status: "Success",
    message: "Train index route",
  });
});

app.get("*", (req, res) => {
  res.status(404).json({
    status: "Not found",
    message: "No route found",
  });
});

connectToDB();

module.exports = app;
