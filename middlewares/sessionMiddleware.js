const session = require("express-session");
const MongoStore = require("connect-mongo");
// const mongoose = require("mongoose");
require("dotenv").config();

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET || "my_secret_key",
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI || "mongodb://localhost:27017/yourdb",
  }),
});

module.exports = sessionMiddleware;
