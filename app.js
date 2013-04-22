var app, express, http, mongoose, path, todos;

http = require("http");
express = require("express");
mongoose = require('mongoose');
path = require("path");
routes = require("./app/routes/site");
mongoose.connect('localhost', 'test');

app = express();
var port = 8180;
app.configure(function() {
  app.set("port", port || 3000);
  app.set('views', __dirname + '/app/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger("dev"));
  app.use(express.bodyParser());
  app.use(app.router);
  return app.use(express["static"](path.join(__dirname, "/public")));
});

app.configure("development", function() {
  return app.use(express.errorHandler());
});


//Mapping of routes
app.all("/", routes.index);
app.get("/todos", routes.list);
app.put("/todos", routes.post);
app.put("/todos/:id", routes.put);
module.exports = app;


http.createServer(app).listen(app.get("port"));

/* Handled by grunt-express
http.createServer(app).listen(app.get("port"), () ->
  console.log "Express server listening on port " + app.get("port")
)
*/
