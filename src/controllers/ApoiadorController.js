const Apoiador = require('../models/Apoiador');


module.exports = {
  async store(req, res) {
    const {
      nome, 
      email, 
      nascimento,      
      cidade, 
      uf, 
      senha
    } = req.body;

    if (await Apoiador.findOne({ email })) {
      return res.status(400).json({ error: 'Esta conta de usuário já existe!' });
    }

    const apoiador = await Apoiador.create({ 
      nome, 
      email, 
      nascimento, 
      cidade, 
      uf, 
      senha       
    });
    return res.json(apoiador);
  }

}