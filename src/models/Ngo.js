const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const NgoSchema = new mongoose.Schema({
  
  status:{
    type:Number,
    require:true},

  name:{
    type: String, 
    require:true},
    
  email:{
    type: String,
    unique:true, 
    require:true},

  whatsapp:{
    type: String, 
    require:true},

  cnpj:{
    type: String,
    require:true, 
    select:false},

  adress:{
    type: String, 
    require:true},
  
  password:{
    type: String, 
    require:true, 
    select:false}, 
});

NgoSchema.pre('save', async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;  
  next();
});
NgoSchema.pre('save', async function (next) {
  const hashCnpj = await bcrypt.hash(this.cnpj, 10);
  this.cnpj = hashCnpj;  
  next();
});

module.exports = mongoose.model('Ngo', NgoSchema);