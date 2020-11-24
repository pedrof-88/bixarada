const User = require('../models/User');


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
      if (await User.findOne({ email })) {
      return res.status(400).json({ error: 'Esta conta de usuário já existe!' });
    }   

    const user = await User.create({ 
      userImage: filename,
      status,
      name, 
      email, 
      birthdate, 
      adress,       
      password       
    });

    return res.json(user);
    
  } catch (err) {
    return res.status(400).send({error: 'Falha no registro.'})
  }
  },

  async update(req, res) {
    const {filename} = req.file;
    const {userId} = req.params;
    const { name, email, birthdate, adress} = req.body;
    const user = await User.findByIdAndUpdate(userId, {
      userImage:filename,       
      name, 
      email, 
      birthdate, 
      adress
    }, {new : true});
    return res.json(user)
  },

  async show(req, res){
    const {userId} = req.params;
    const user = await User.findById(userId);
    return res.json(user);
  },

  async destroy(req, res){
    const {userId} = req.params;
    await User.findOneAndDelete( userId);
    return res.json({ sucess:'Conta de usuário deletada com sucesso.'});
  }
}