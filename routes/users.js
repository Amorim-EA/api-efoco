const express = require("express");
const routes = express.Router()
const userController = require("../controllers/userController");

routes.route("/user").post(userController.createUser);
routes.route("/user/auth").post(userController.authenticatedUser);
routes.route("/user/request").get(userController.requestAgent);
routes.route("/user/request").put(userController.changeToAgent);

module.exports = routes;