const express = require("express");
const routes = express.Router()
const focoController = require("../controllers/focoController");

routes.post("/focos", focoController.createFoco);
routes.get("/focos", focoController.getAllFoco);
routes.get("/focos/:id", focoController.getOneFoco);
routes.delete("/focos/:id", focoController.deleteFoco);
routes.put("/focos/:id", focoController.updateFoco);

module.exports = routes;