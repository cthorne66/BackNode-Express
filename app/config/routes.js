var async = require('async');
var api_root = '/api';

module.exports = function(app, passport, auth) {

	app.get('/', function(req, res) {
		res.render('index', { title: app.get('title') });
	});


	// user routes
  var UserController = require('../controllers/users');
  var users = new UserController(app);
  // app.get('/login', users.login);
  // app.get('/signup', users.signup);
  // app.get('/logout', users.logout);
  app.get(api_root + '/users', users.index);
  app.get(api_root + '/user/:id', users.show);
  app.post(api_root + '/user', users.save);
  // app.post('/users/session', passport.authenticate('local', {failureRedirect: '/login', failureFlash: 'Invalid email or password.'}), users.session);
  // app.get('/users/:userId', users.show);
  // app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'user_about_me'], failureRedirect: '/login' }), users.signin);
  // app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), users.authCallback);
  // app.get('/auth/github', passport.authenticate('github', { failureRedirect: '/login' }), users.signin);
  // app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), users.authCallback);
  // app.get('/auth/twitter', passport.authenticate('twitter', { failureRedirect: '/login' }), users.signin);
  // app.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/login' }), users.authCallback);
  // app.get('/auth/google', passport.authenticate('google', { failureRedirect: '/login', scope: 'https://www.google.com/m8/feeds' }), users.signin);
  // app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login', scope: 'https://www.google.com/m8/feeds' }), users.authCallback);

	var PostController = require('../controllers/posts');
	var posts = new PostController(app);
	app.get(api_root + '/posts', posts.index);
	app.get(api_root + '/post/:id', posts.show);
	//app.all(api_root + '/post/:id', passport.authenticate('local'), function(req, res) { posts.show; });
	app.all(api_root + '/post/comment', posts.comment);
};
