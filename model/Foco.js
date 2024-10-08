const mongoose = require("mongoose");
const { Schema } = mongoose;

const focoSchema = new Schema({
  description: { 
    type: String,
    required: true,
  },
  longitude: { 
    type: Number, // coordenadas numéricas?
    required: true,
  },
  latitude: { 
    type: Number, // coordenadas numéricas?
    required: true,
  },
  image: {
    type: String, 
    required: true,
  },
  cidadao: { 
    type: String,
    required: true,
  },
  status: { 
    type: String,
    default: 'aberto',
  },
  agente: { 
    type: String,
    default: '',
  },
  acao: { 
    type: String,
    default: '',
  }
}, { timestamps: true });

const Foco = mongoose.model("Foco", focoSchema);
module.exports = Foco;
