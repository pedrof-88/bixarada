const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const OngSchema = new mongoose.Schema({
  nome: String,
  email: String,
  telefone: String,
  cnpj: String,
  cidade: String,
  uf: String,
  senha: String, 
});

OngSchema.pre('save', async function (next) {
  const hashSenha = await bcrypt.hash(this.senha, 10);
  this.senha = hashSenha;  
  next();
});
OngSchema.pre('save', async function (next) {
  const hashCnpj = await bcrypt.hash(this.cnpj, 10);
  this.cnpj = hashCnpj;  
  next();
});

module.exports = mongoose.model('Ong', OngSchema);