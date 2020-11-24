const mongoose = require('mongoose');

const IncidentSchema = new mongoose.Schema({

  incidentImage:String,
  title:{
    type:String,
    require:true
  },

  description:String,

  goal:{
    type:Number, 
    require:true
  },
  
  total:{
    type:Number,
    default: 0
  },

  start:{
    type:String,
    require:true
  },
  end:{
    type:String,
    require:true
  },
  registeredAt: {
    type:Date, 
    default:Date.now,
  },
  ngo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ngo',
  },

},{
  toJSON: {
    virtuals: true,
  },
});

IncidentSchema.virtual('incidentImage_url').get(function (){
  return `${global.IP_ADDRESS}/images/${this.incidentImage}`
})

module.exports = mongoose.model('Incidents', IncidentSchema )