var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var FlatSchema = new Schema({
  address: {
    type: String,
    required: 'Kindly enter the address of the flat'
  },
  id_poste: {
    type: String,
    default: 0
  },
  geoloc: {
    type: [Number],
    index: '2d'
  },
  flatName: {
  	type: String,
  	default: null
  },
  photo: {
    type: String,
    default: "https://www.usine-digitale.fr/mediatheque/7/0/2/000354207_galDiapo/sogeti.jpg"
  },
  auth_vocal: {
    type: Boolean,
    default: 0
  },
  auth_facial: {
    type: Boolean,
    default: 0
  },
  auth_bluetooth: {
    type: Boolean,
    default: 0
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: [{
      type: String,
      enum: ['open', 'open_pending', 'close']
    }],
    default: ['close']
  }
});

module.exports = mongoose.model('Flats', FlatSchema);