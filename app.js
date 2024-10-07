const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

/** Token
const { expressjwt: expressJWT } = require('express-jwt');
const cookieParser = require('cookie-parser');

app.use(cookieParser());

app.use(
  expressJWT({
      secret: process.env.SECRET,
      algorithms: ["HS256"],
      getToken: req => req.cookies.token
  }).unless({
      path: ["/api/user", "/api/user/auth"]
  })
);
*/

// DB Connection
const conection = require("./db/conection");
conection();

// Routes
const routes = require("./routes/router");
app.use("/api", routes);

app.listen(port, () => {
    console.log(`Servidor está rodando na porta ${port}`)
});