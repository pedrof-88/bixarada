const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Ngo = require('../models/Ngo');



module.exports = {
  /*async store(req,res) {
    const {email, password} = req.body;
    const apoiador = await Apoiador.findOne({ email }).select('+password') 
      if (!apoiador) {
      return res.status(400).json({error: 'Usuário não encontrado'});
    }
  
    if(!await bcrypt.compare(password, apoiador.password)) {
      return res.status(400).json({error: 'Senha inválida'});
    }
    
   return res.json(apoiador)
  },*/


async store(req,res) { 
  const {email, password} = req.body;
  const user = await User.findOne({email}).select('+password')
  if(!user) {
    const ngo = await Ngo.findOne({email}).select('+password')
    if(!ngo) {
      return res.status(400).json({error: 'Usuário não encontrado.'});
    }
    if(!await bcrypt.compare(password, ngo.password)){
      return res.status(400).json({error: 'Senha inválida'});
    }
    return res.json(ngo)
  }
  if(!await bcrypt.compare(password, user.password)){
    return res.status(400).json({error: 'Senha inválida'});
  }
  return res.json(user)

}
}

