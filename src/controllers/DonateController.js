const Casos = require('../models/Casos');
const Donate = require('../models/Donate');


module.exports = {
  
  async store(req, res) {
    const {value , status} = req.body;    
    const donation = await Donate.create({
      value,
      status,
      incident: req.params.incidentId,
      user: req.params.userId
    });
    if (value > 0) {
      await Casos.findOneAndUpdate({incidentId: res.incidentId}, {        
        $inc: {total: value }
        
    }, {new : true});
    
  }
    return res.json(donation)
  },
  async index(req, res) {
     const donation = await Donate.find();
     donation.reverse();
     return res.json(donation);
   },
  

}
  
 



