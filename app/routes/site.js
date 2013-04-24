var api_root = '/api';

var mongoose = require('mongoose');
var Post = mongoose.model('Post');

module.exports = function(app, db) {

  app.get('/', function(req, res) {
    res.render('index', {title: 'express'});
  });

  app.get(api_root+'/posts', function(req, res) {
    Post.find({}, function (arr,data) {
      res.send(data);
    });
  });

  app.get(api_root+'/post/:id', function(req, res) {
    var postId = req.params.id;
    console.log(postId);
    Post.find({id:postId}, function (err,data) {
      res.send(data);
    });
  });

};

// exports.index = function(req,res) {
//   res.render('index', {title: 'express'});
// };

// exports.list = function(req, res) {
//   return res.json([
//     {
//       title: 'First todo'
//     }
//   ]);
// };

// exports.post = function(req, res) {
//   var todo;
//   todo = new Todo({
//     title: 'hello'
//   });
//   return todo.save(function(err) {
//     if (err != null) {
//       next(err);
//     }
//     return res.json(todo);
//   });
// };

// exports.put = function(req, res) {
//   return res.send(404, 'Implement');
// };

// exports.examplePosts = function(req, res) {
//   return res.json(
//     [{"id":"1","title":"Lorem Ipsum","content":"Sed posuere consectetur est at lobortis. Donec id elit non mi porta gravida at eget metus. Donec ullamcorper nulla non metus auctor fringilla. Nullam id dolor id nibh ultricies vehicula ut id elit. Maecenas faucibus mollis interdum.","user_id":"1","is_deleted":"0","create_date":"2013-04-07 01:01:05","comments":[{"id":"1","post_id":"1","content":"My comment","user_id":"1","is_deleted":"0","create_date":"2013-04-07 01:01:05"}]}]
//   );
// };

// exports.posts = function(req, res) {
//   return res.json(
//     [{"id":"1","title":"Lorem Ipsum","content":"Sed posuere consectetur est at lobortis. Donec id elit non mi porta gravida at eget metus. Donec ullamcorper nulla non metus auctor fringilla. Nullam id dolor id nibh ultricies vehicula ut id elit. Maecenas faucibus mollis interdum.","user_id":"1","is_deleted":"0","create_date":"2013-04-07 01:01:05","comments":[{"id":"1","post_id":"1","content":"My comment","user_id":"1","is_deleted":"0","create_date":"2013-04-07 01:01:05"}]}]
//   );
// };