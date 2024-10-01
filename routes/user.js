const express = require("express");
const routes = express.Router()
const userController = require("../controllers/userController");

routes.post("/user", userController.createUser);
routes.post("/user/authentication", userController.authenticatedUser);

module.exports = routes;