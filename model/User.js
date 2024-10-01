const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  cpf: { 
    type: String, 
    required: true 
  },
  agente: { 
    type: Boolean, 
    default: false 
  },
  solicitado: { 
    type: Boolean, 
    default: false 
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;