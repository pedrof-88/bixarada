const Ong = require("../models/Ong");

module.exports = {
  async store(req, res) {
    const {
      name, 
      email, 
      whatsapp, 
      cnpj, 
      adress,       
      password
    } = req.body;

    if (await Ong.findOne({ email })) {
      return res.status(400).json({ error: 'Esta conta de usuário já existe!' });
    }

    const ong = await Ong.create({ 
      name, 
      email, 
      whatsapp, 
      cnpj, 
      adress,       
      password       
    });
    return res.json(ong);
  },

    async show(req, res) {
      const ong = await Ong.find();      
      return res.json(ong);
    },

    /*async update(req, res) {
    const {ongId} = req.params;
    const { name, email, whatsapp, adress } = req.body;
    const ong = await Ong.findByIdAndUpdate(ongId, {       
      name, 
      email, 
      whatsapp,      
      adress 
     
    }, {new : true});
    return res.json(ong)
    },*/

    async update(req, res) {      
      const {ongId} = req.params;
      const { name, email, whatsapp, adress } = req.body;
      const ong = await Ong.findByIdAndUpdate(ongId, {        
        name, 
        email, 
        whatsapp, 
        adress 
        
      }, {new : true});
      return res.json(ong)
    },

    async destroy(req, res){
      const {ongId} = req.params;
      await Ong.findOneAndDelete( ongId);
      return res.json({ sucess:'Conta de usuário deletada com sucesso.'});
    }
}