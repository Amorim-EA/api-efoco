const express = require("express");
const routes = express.Router();

// Foco router
const focosRouter = require("./focos");
routes.use("/", focosRouter);

// User router
const userRouter = require("./users");
routes.use("/", userRouter);

module.exports = routes

