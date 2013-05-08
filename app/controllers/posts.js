/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');
var _ = require('underscore');
var moment = require('moment');

var PostController = function(app, db) {

  this.index = function(req, res) {
    Post.find({}, function(arr,data) {
      res.send(data);
    });
  };

  this.show = function(req, res) {
      var postId = req.params.id;
      console.log('post id: '+ postId);
      Post.findOne({id: postId}, function(err,data) {
        res.send(data);
      });
  };

  this.comment = function(req, res) {
    var comment = req.body;
    var date = moment.utc();
    comment.createDate = date.valueOf();
    Post.findOne({id: comment.postId}, function(err,post) {
      post.comments.push(comment);
      post.save();
      res.send(post);
    });
  };
};

module.exports = PostController;