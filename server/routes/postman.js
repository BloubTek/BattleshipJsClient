module.exports = function(app) {
  var postmans = require('../controllers/postmanController');
app.route('/postmans')
.get(postmans.get_all_postmans)
.post(postmans.add_a_postman);
app.route('/postmans/:_id')
.get(postmans.get_a_postman)
.put(postmans.update_postman)
.delete(postmans.delete_postman);
};
