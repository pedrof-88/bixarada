const mongoose = require('mongoose');
const DonateSchema = new mongoose.Schema({
  value:{
    type:Number, 
    require:true
  },
  
  status:Boolean,

  requestAt :{
    type:Date,
    default: Date.now,
  },

  incident: {
    type:mongoose.Schema.Types.ObjectId,
    ref: 'Incident'
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }

});




module.exports = mongoose.model('Donate',DonateSchema)