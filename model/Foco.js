const mongoose = require("mongoose");
const { Schema } = mongoose;

// Entender como vai ficar a localização e a imagem...
const focoSchema = new Schema({
  description: { 
   type: String,
   required: true
  },
  localization: {
    longitude: { 
      type: String,
      required: true
    },
    latitude: { 
      type: String,
      required: true
    }
  },
  image:[
    { 
      src: {
        type: String,
        required: true
      }
    }
  ],
});

const Foco = mongoose.model("Foco", focoSchema);
module.exports = Foco;