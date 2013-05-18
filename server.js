var http = require('http'),
	express = require('express'),
	fs = require('fs'),
	passport = require('passport');

// Load configurations
var env = process.env.NODE_ENV || 'development',
	config = require('./app/config/config')[env],
	auth = require('./app/config/authorization'),
	mongoose = require('mongoose');

mongoose.connect(config.db);

// Bootstrap the models
var models_path = __dirname + '/app/models';
fs.readdirSync(models_path).forEach(function(file) {
	require(models_path + '/' + file);
});

// bootstrap passport config
require('./app/config/passport')(passport, config);

var app = express();

// express settings
require('./app/config/express')(app, config, passport);

// app.configure('development', function() {
//	return app.use(express.errorHandler());
// });

// Bootstrap the routes
routes = require('./app/config/routes')(app, passport, auth);
// http.createServer(app).listen(app.get('port'));

// Start the app by listening on <port>
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express app started on port ' + port);

// expose app
exports = module.exports = app;