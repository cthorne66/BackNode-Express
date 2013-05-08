var api_root = '/api';

module.exports = function(app, db) {

  app.get('/', function(req, res) {
    res.render('index', {title: 'express'});
  });

  var PostController = require('../controllers/posts');
  var posts = new PostController(app,db);
  app.get(api_root+'/posts', posts.index);
  app.get(api_root+'/post/:id', posts.show);
  app.all(api_root+'/post/comment', posts.comment);

};