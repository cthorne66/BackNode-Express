var api_root = '/api';

module.exports = function(app, db) {

  app.get('/', function(req, res) {
    res.render('index', {title: 'express'});
  });

  var posts = require('../controllers/posts');
  app.get(api_root+'/posts', posts.index);
  app.get(api_root+'/post/:id', posts.show);

};