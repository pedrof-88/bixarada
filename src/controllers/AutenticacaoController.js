const bcrypt = require('bcryptjs');
const Apoiador = require('../models/Apoiador');



module.exports = {
  async store(req,res) {
    const {email, senha} = req.body;
    const apoiador = await Apoiador.findOne({ email }).select('+senha') 
      if (!apoiador) {
      return res.status(400).json({error: 'Usúario não encontrado'});
    }
  
    if(!await bcrypt.compare(senha, apoiador.senha)) {
      return res.status(400).json({error: 'Senha inválida'});
    }
    
   return res.json(apoiador)
  },
};
