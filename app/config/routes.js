var async = require('async');
var api_root = '/api';

module.exports = function(app, passport, auth) {

	app.get('/', function(req, res) {
		res.render('index', { title: app.get('title') });
	});

	var PostController = require('../controllers/posts');
	var posts = new PostController(app);
	app.get(api_root + '/posts', posts.index);
	app.get(api_root + '/post/:id', posts.show);
	//app.all(api_root + '/post/:id', passport.authenticate('local'), function(req, res) { posts.show; });
	app.all(api_root + '/post/comment', posts.comment);
};
