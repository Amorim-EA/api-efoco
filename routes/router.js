const express = require("express");
const routes = express.Router()

// Foco router
const focosRouter = require("./focos");
routes.use("/", focosRouter);

//User Router
const userRouter = require("./user");
routes.use("/", userRouter);

module.exports = routes;

