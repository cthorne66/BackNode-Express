
var http = require("http");
var express = require("express");
var app = express();
var path = require("path");
var fs = require('fs');

var mongoose = require('mongoose');
mongoose.connect('localhost', 'mydb');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("connection open");
});


var port = 8180;
app.configure(function() {
  app.set("port", port || 3000);
  app.set('views', __dirname + '/app/views');
  //app.set('view engine', 'jade');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger("dev"));
  app.use(express.bodyParser());
  app.use(app.router);
  return app.use(express["static"](path.join(__dirname, "/public")));
});

app.configure("development", function() {
  return app.use(express.errorHandler());
});

// Bootstrap models
var models_path = __dirname + '/app/models';
fs.readdirSync(models_path).forEach(function (file) {
  require(models_path+'/'+file);
});

//Mapping of routes
//app.all("/", routes.index);
//app.all("/api/postwithcomments", routes.examplePosts);
//app.get("/todos", routes.list);
//app.put("/todos", routes.post);
//app.put("/todos/:id", routes.put);
//module.exports = app;

/**
 * Register routes with the app
 */
//require('./routes')(app, db_conn, passport);
routes = require("./app/routes/site")(app,db);

http.createServer(app).listen(app.get("port"));

/* Handled by grunt-express
http.createServer(app).listen(app.get("port"), () ->
  console.log "Express server listening on port " + app.get("port")
)
*/
