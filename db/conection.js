const mongoose = require("mongoose");
require("dotenv").config();
mongoose.set("strictQuery", true);

async function main() {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@cluster0.w127n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log("Conectado ao banco com sucesso!")

  } catch (error) {
    console.log(`Erro: ${error}`);
  }
}

module.exports = main;