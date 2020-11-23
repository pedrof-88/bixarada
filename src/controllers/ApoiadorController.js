const Apoiador = require('../models/Apoiador');


module.exports = {
  async store(req, res) {
    const { filename } = req.file;
    const {
      status,
      name, 
      email, 
      birthdate,      
      adress, 
      password
    } = req.body;

    try {       
      if (await Apoiador.findOne({ email })) {
      return res.status(400).json({ error: 'Esta conta de usuário já existe!' });
    }   

    const apoiador = await Apoiador.create({ 
      userImage: filename,
      status,
      name, 
      email, 
      birthdate, 
      adress,       
      password       
    });

    return res.json(apoiador);
    
  } catch (err) {
    return res.status(400).send({error: 'Falha no registro.'})
  }
  },

  async update(req, res) {
    const {filename} = req.file;
    const {userId} = req.params;
    const { name, email, birthdate, adress} = req.body;
    const apoiador = await Apoiador.findByIdAndUpdate(userId, {
      userImage:filename,       
      name, 
      email, 
      birthdate, 
      adress
    }, {new : true});
    return res.json(apoiador)
  },

  async show(req, res){
    const {userId} = req.params;
    const apoiador = await Apoiador.findById(userId);
    return res.json(apoiador);
  },

  async destroy(req, res){
    const {userId} = req.params;
    await Apoiador.findOneAndDelete( userId);
    return res.json({ sucess:'Conta de usuário deletada com sucesso.'});
  }
}