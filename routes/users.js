const express = require("express");
const routes = express.Router()
const userController = require("../controllers/userController");

routes.route("/users").post(userController.createUser);
routes.route("/users/auth").post(userController.authenticatedUser);
routes.route("/users/request").get(userController.requestAgent);
routes.route("/users/request").put(userController.changeToAgent);

module.exports = routes;