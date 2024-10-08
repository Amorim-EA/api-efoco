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
    required: true,
    unique: true 
  },
  type: { 
    type: String, 
    default: 'cidadao'
  },
  solicited: { 
    type: Boolean, 
    default: false 
  }
}, 
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;