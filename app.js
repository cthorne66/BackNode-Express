var http = require('http');
var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');

var mongoose = require('mongoose');
mongoose.connect('localhost', 'backnode-express');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
  console.log('connection open');
});

app.configure(function() {
  app.set('port', 3000);
  app.set('views', __dirname + '/app/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(app.router);
  return app.use(express['static'](path.join(__dirname, '/public')));
});

app.configure('development', function() {
  return app.use(express.errorHandler());
});

// Bootstrap the models
var models_path = __dirname + '/app/models';
fs.readdirSync(models_path).forEach(function(file) {
  require(models_path + '/' + file);
});

// Bootstrap the routes
routes = require('./app/config/routes')(app, db);

http.createServer(app).listen(app.get('port'));