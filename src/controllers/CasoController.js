const Casos = require('../models/Casos');

module.exports = {

  async store(req,res) {
    const { filename } = req.file;
    const { titulo, descricao, meta} = req.body;
    const caso = await Casos.create({
      imagemCaso: filename,
      titulo, 
      descricao,
      meta,      
      ong: req.params.ongId,
    });
    return res.json(caso);
  },

  async index(req, res) {
    const caso = await Casos.find();
    caso.reverse();
    return res.json(caso);
  },

  async list(req, res) {
    const caso = await Casos.find({ ong: req.params.ongId});   
    return res.json(caso);
  },

  async show(req, res) {
    const caso = await Casos.findById(req.params.casoId);
    return res.json(caso);
  },
}