const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// DB Connection
const conection = require("./db/conection");
conection();

// Routes
const routes = require("./routes/router");
app.use("/api", routes);

app.listen(port, () => {
    console.log(`Servidor está rodando na porta ${port}`)
});