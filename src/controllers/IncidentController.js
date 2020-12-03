const Incidents = require('../models/Incident');
const { update } = require('./NgoController');

module.exports = {

  async store(req,res) {
    const { filename } = req.file;
    const { status, title, description, goal, total, start, end} = req.body;
    const incident = await Incidents.create({
      incidentImage: filename,
      status,
      title, 
      description,
      goal,
      total,
      start,
      end,      
      ngo: req.params.ngoId,
    });
    return res.json(incident);
  },

  async index(req, res) {
    const incident = await Incidents.find();
    incident.reverse();
    return res.json(incident);
  },

  async list(req, res) {
    const incident = await Incidents.find({ ngo: req.headers.authorization});   
    return res.json(incident);
  },  

  async show(req, res) {
    const incident = await Incidents.findById(req.params.incidentId);
    return res.json(incident);
  },

  async listDetail(req, res) {
    const incident = await Incidents.findById(req.params.incidentId);
    await incident.populate(['ong' , 'incident']).execPopulate();
    return res.json(incident);
  },
    async update(req, res) {
    const {filename} = req.file;
    const { incidentId } = req.params;
    const { title, description, goal, start, end} = req.body;
    const incident = await Incidents.findByIdAndUpdate(incidentId, {    
      incidentImage: filename,
      title, 
      description,
      goal,
      start,
      end,      
    }, {new : true});
    return res.json(incident)
  },
}
