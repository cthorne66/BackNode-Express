/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');
var _ = require('underscore');
var moment = require('moment');

var PostController = function(app) {

	var errorResponse = function(res, responseCode, msg) {
		return res.send(responseCode, {
			error: msg
		});
	};

	this.index = function(req, res) {
		Post.find({}, function(arr, data) {
			res.send(data);
		});
	};

	this.show = function(req, res) {
		var postId = req.params.id;
		console.log('post id: ' + postId);
		Post.findOne({
			_id: postId
		}, function(err, data) {
			res.send(data);
		});
	};

	this.addPost = function(req, res) {
		try {
			var data = req.body;
			var date = moment.utc();
			data.createDate = date.valueOf();

			var post = new Post(data);
			post.save(function(error, savedPost) {
				if (error) {
					throw "could not save";
				} else {
					res.send(savedPost);
				}
			});
		} catch (err) {
			errorResponse(res, 500, 'something blew up');
		}
	};

	this.addComment = function(req, res) {
		try {
			var comment = req.body,
				date = moment.utc();

			comment.userId = req.user.userName;
			comment.createDate = date.valueOf();
			Post.findOne({
				_id: comment.postId
			}, function(error, post) {
				post.comments.push(comment);
				post.save();
				res.send(post);
			});
		} catch (err) {
			errorResponse(res, 500, 'something blew up');
		}
	};
};

module.exports = PostController;