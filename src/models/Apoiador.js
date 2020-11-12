const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const ApoiadorSchema = new mongoose.Schema({
  userImage:String,
  name: {
    type: String,
    require:true},
  email: {
    type: String,
    require: true,
    lowercase: true,
    unique: true
  },
  birthdate:{
    type: String, 
    required: true }, 
  adress:{
    type: String,
    require: true
  }, 
  password:{
    type: String,
    require:true, 
    select:false
  }  
},
{
  toJSON: {
    virtuals:true,
  },
});
ApoiadorSchema.pre('save', async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;  
  next();
  
});

ApoiadorSchema.virtual('userImage_url').get(function () {
  return `${global.IP_ADDRESS}/images/${this.userImage}`;
})

module.exports = mongoose.model('Apoiador', ApoiadorSchema)
