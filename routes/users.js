const express = require("express");
const routes = express.Router()
const userController = require("../controllers/userController");
const auth = require('../middleware/auth');

routes.post("/users", userController.createUser);
routes.post("/users/auth", userController.authenticatedUser);
routes.get("/users/request", auth, userController.requestAgent);
routes.put("/users/request", auth, userController.changeToAgent);

module.exports = routes;