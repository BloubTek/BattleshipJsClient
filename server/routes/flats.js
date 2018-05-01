module.exports = function(app) {
  var flats = require('../controllers/flatsController');
app.route('/flats')
.get(flats.get_all_flats)
.post(flats.add_a_flat);
app.route('/flats/:_id')
.get(flats.get_a_flat)
.put(flats.update_flat)
.delete(flats.delete_flat);
};
