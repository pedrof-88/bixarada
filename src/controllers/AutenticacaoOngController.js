const bcrypt = require('bcryptjs');
const Ong = require('../models/Ong')

module.exports = {
  async store(req,res) {
    const {email, senha} = req.body;
    const ong = await Ong.findOne({ email }).select('+senha') 
      if (!ong) {
      return res.status(400).json({error: 'Usúario não encontrado'});
    }  
    if(!await bcrypt.compare(senha, ong.senha)) {
      return res.status(400).json({error: 'Senha inválida'});
    }
    
   return res.json(ong)
  }
};