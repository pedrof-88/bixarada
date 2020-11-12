const mongoose = require('mongoose');

const CasoSchema = new mongoose.Schema({

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
  ong: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ong',
  },

},{
  toJSON: {
    virtuals: true,
  },
});

CasoSchema.virtual('incidentImage_url').get(function (){
  return `${global.IP_ADDRESS}/images/${this.incidentImage}`
})

module.exports = mongoose.model('Casos', CasoSchema )