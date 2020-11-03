const mongoose = require('mongoose');

const CasoSchema = new mongoose.Schema({

  imagemCaso:String,
  titulo:String,
  descrição:String,
  meta:String,
  registeredAt: {
    type:Date, 
    defaut:Date.now,
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

CasoSchema.virtual('imagemCaso_url').get(function (){
  return `${global.IP_ADDRESS}/images/${this.imagemCaso}`
})

module.exports = mongoose.model('Casos', CasoSchema )