const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const ApoiadorSchema = new mongoose.Schema({
  nome: String,
  email: String,
  nascimento: String,  
  cidade: String,
  uf: String,
  senha: String,  
});
ApoiadorSchema.pre('save', async function (next) {
  const hashsenha = await bcrypt.hash(this.senha, 10);
  this.senha = hashsenha;  
  next();
});

module.exports = mongoose.model('Apoiador', ApoiadorSchema);
