var app, express, http, mongoose, path, todos;

http = require("http");

express = require("express");

todos = require("./api/routes/todos");

mongoose = require('mongoose');

path = require("path");

mongoose.connect('localhost', 'test');

app = express();

app.configure(function() {
  app.set("port", process.env.PORT || 3000);
  app.use(express.favicon());
  app.use(express.logger("dev"));
  app.use(express.bodyParser());
  app.use(app.router);
  return app.use(express["static"](path.join(__dirname, "/web/public")));
});

app.configure("development", function() {
  return app.use(express.errorHandler());
});

app.get("/todos", todos.list);

app.put("/todos", todos.post);

app.put("/todos/:id", todos.put);

module.exports = app;


http.createServer(app).listen(8180);

/* Handled by grunt-express
http.createServer(app).listen(app.get("port"), () ->
  console.log "Express server listening on port " + app.get("port")
)
*/
