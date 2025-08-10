const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  street: String,
  complement: String,
  city: String,
  state: String,
  cep: String
}, { _id: false });

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName:  { type: String, required: true },
  email:     { type: String, required: true, unique: true },
  password:  { type: String, required: true },
  phone:     String,
  cpf:       { type: String, required: true, unique: true },
  address:   addressSchema,
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
