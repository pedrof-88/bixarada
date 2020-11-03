const Ong = require("../models/Ong");

module.exports = {
  async store(req, res) {
    const {
      nome, 
      email, 
      telefone, 
      cnpj, 
      cidade, 
      uf, 
      senha
    } = req.body;

    if (await Ong.findOne({ email })) {
      return res.status(400).json({ error: 'Esta conta de usuário já existe!' });
    }

    const ong = await Ong.create({ 
      nome, 
      email, 
      telefone, 
      cnpj, 
      cidade, 
      uf, 
      senha       
    });
    return res.json(ong);}
}