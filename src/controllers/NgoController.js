const Ngo = require("../models/Ngo");

module.exports = {
  async store(req, res) {
    const {
      name, 
      email, 
      whatsapp, 
      cnpj, 
      adress,       
      password, 
      status
    } = req.body;

    if (await Ngo.findOne({ email })) {
      return res.status(400).json({ error: 'Esta conta de usuário já existe!' });
    }

    const ngo = await Ngo.create({ 
      name, 
      email, 
      whatsapp, 
      cnpj, 
      adress,       
      password,
      status       
    });
    return res.json(ngo);
  },

  async show(req, res){
    const {ngoId} = req.params;
    const ngo = await Ngo.findById(ngoId);
    return res.json(ngo);
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
      const {ngoId} = req.params;
      const { name, email, whatsapp, adress } = req.body;
      const ngo = await Ngo.findByIdAndUpdate(ngoId, {        
        name, 
        email, 
        whatsapp, 
        adress 
        
      }, {new : true});
      return res.json(ngo)
    },

    async destroy(req, res){
      const {ngoId} = req.params;
      await Ngo.findOneAndDelete( ngoId);
      return res.json({ sucess:'Conta de usuário deletada com sucesso.'});
    }
}