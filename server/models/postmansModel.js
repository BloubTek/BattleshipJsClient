var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var PostmanSchema = new Schema({
  address: {
    type: String,
    required: true
  },
  id_poste: {
    type: String,
    required: true
//    default: 0
  },
  Name: {
    type: String,
    required: true
//    default: "Jack Bauer"
  },
  Tel: {
  type: String,
  required: true
//    default: "Jack Bauer"
  },
  photo: {
    type: String,
    default: "http://i0.wp.com/esad-stg.net/wp-content/plugins/buddypress/bp-core/images/mystery-man.jpg"
  },
  dept_rattachement: {
    type: String,
    default: 75
  },
  auth_vocal: {
    type: String,
    required: true
  },
  auth_facial: {
    type: String,
    required: true
    //default: 0
  },
  bluetooth_address: {
    type: String,
    required: true
    //default: 0
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

module.exports = mongoose.model('postmans', PostmanSchema);