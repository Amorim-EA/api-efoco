const express = require("express");
const routes = express.Router()
const focoController = require("../controllers/focoController");
const upload = require('../middleware/upload');
const path = require('path');
const auth = require('../middleware/auth');

routes.post("/focos", auth, upload.single("imageFile"),  focoController.createFoco);
routes.get("/focos", auth, focoController.getAllFoco);
routes.get("/focosCad", auth, focoController.getLenFocos);
routes.get("/focos/:id", auth, focoController.getOneFoco);
routes.get('/foco/image/:filename', auth, (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, '../uploads', filename); 

  res.sendFile(filePath, (err) => {
    if (err) {
      console.error(err);
      res.status(404).send('Imagem não encontrada');
    }
  });
});
routes.delete("/focos/:id", auth, focoController.deleteFoco);
routes.put("/focos/:id", auth, focoController.updateFoco);

module.exports = routes;