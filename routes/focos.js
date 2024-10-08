const express = require("express");
const routes = express.Router()
const focoController = require("../controllers/focoController");
const upload = require('../middleware/upload');
const path = require('path');

routes.post("/focos", upload.single("imageFile"),  focoController.createFoco);
routes.get("/focos", focoController.getAllFoco);
routes.get("/focos/:id", focoController.getOneFoco);
routes.get('/foco/image/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, '../uploads', filename); 

  res.sendFile(filePath, (err) => {
    if (err) {
      console.error(err);
      res.status(404).send('Imagem não encontrada');
    }
  });
});
routes.delete("/focos/:id", focoController.deleteFoco);
routes.put("/focos/:id", focoController.updateFoco);

module.exports = routes;