var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var Flat = require('./models/flatsModel');
var Postman = require('./models/postmansModel');
var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());

// Configuring the database
var dbConfig = require('./config/database.config.js');
var mongoose = require('mongoose');
 mongoose.connect(dbConfig.url);

 mongoose.connection.on('error', function() {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});
mongoose.connection.once('open', function() {
    console.log("Successfully connected to the database");
})

var Schema = mongoose.Schema;
var commentSchema = new Schema({
  Name: String
});

var Comment = mongoose.model('Comment', commentSchema);

var http = require('http');

//ajout des routes ici
var routes = require('./routes/flats'); //importing route
routes(app);
var routes = require('./routes/postman'); //importing route
routes(app);


app.all('/*', function(req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

// Auth Middleware - This will check if the token is valid
// Only the requests that start with /api/v1/* will be checked for the token.
// Any URL's that do not follow the below pattern should be avoided unless you 
// are sure that authentication is not needed
app.all('/api/v1/*', [require('./middlewares/validateRequest')]);

app.use('/', require('./routes'));
app.use('/assets2', express.static(path.join(__dirname,  '..', 'client', 'public')));
app.on('uncaughtException', function (err) {
    console.error(err.stack);
    console.log("Node NOT Exiting...");
});


app.get('/', function(req, res){
    res.json({"message": "test réponse de l'API"});
});
app.get('/profil', (req, res) => res.sendFile((path.join(__dirname, '..', 'client', 'index.html'))));
//app.get('/accueil', (req, res) => res.sendFile((path.join(__dirname, '..', 'client', 'home.html'))));
app.get('/accueil', (req, res) => res.sendFile((path.join(__dirname, '..', 'client', 'home_v2.html'))));
app.get('/details', (req, res) => res.sendFile((path.join(__dirname, '..', 'client', 'details.html'))));
app.get('/add', (req, res) => res.sendFile((path.join(__dirname, '..', 'client', 'add.html'))));

// If no route is matched by now, it must be a 404
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// Start the server
app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});