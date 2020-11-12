const bcrypt = require('bcryptjs');
const Apoiador = require('../models/Apoiador');
const Ong = require('../models/Ong');



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
  const apoiador = await Apoiador.findOne({email}).select('+password')
  if(!apoiador) {
    const ong = await Ong.findOne({email}).select('+password')
    if(!ong) {
      return res.status(400).json({error: 'Usuário não encontrado.'});
    }
    if(!await bcrypt.compare(password, ong.password)){
      return res.status(400).json({error: 'Senha inválida'});
    }
    return res.json(ong)
  }
  if(!await bcrypt.compare(password, apoiador.password)){
    return res.status(400).json({error: 'Senha inválida'});
  }
  return res.json(apoiador)

}
}

