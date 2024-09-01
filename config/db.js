const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/dummyDB";

const connectToDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("DummyDB is set");
  } catch (error) {
    console.log("Connection Failed", error.message);
  }
};

module.exports = connectToDB;
