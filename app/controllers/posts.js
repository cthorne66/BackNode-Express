/**
 * Module dependencies.
 */
var mongoose = require('mongoose'); 
var Post = mongoose.model('Post');
var _ = require('underscore');

exports.index = function(req, res){
	Post.find({}, function (arr,data) {
		res.send(data);
	});
};

exports.show = function(req, res){
    var postId = req.params.id;
    console.log("post id: "+postId);
    Post.find({id:postId}, function (err,data) {
      res.send(data);
    });
};