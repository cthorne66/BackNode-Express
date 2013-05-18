// Define jQuery as AMD module
define.amd.jQuery = true;

define([
	'core',
	'domReady',
	'router',
	'app',
	'models/login',
	'models/webUser',
	'collections/comments',
	'views/navbarView',
	'views/searchView',
	'views/loginView'
	], function(core, domReady, Router, App, LoginModel, WebUser, CommentCollection, NavbarView, SearchView, LoginView) {

	//listen for any ajax errors in the site
	$(document).ajaxError(function(event, jqxhr, settings, exception) {
		//console.log(event, jqxhr, settings, exception);
		if (jqxhr.status == 401) {
			App.vent.trigger('alert', {
				msg: 'Login Required',
				type: 'error'
			});
			Backbone.history.navigate('/', true);

		} else {
			console.log(event, jqxhr, settings, exception);
		}
	});

	// Initialize search
	App.addInitializer(function(options) {
		var searchView = new SearchView({});
		searchView.render();
	});

	// Cross app collections
	App.comments = new CommentCollection();

	// Web User
	App.vent.on('webUser:init', function(data) {
		$('body').removeClass('guest').addClass('logged-in');

		var model = data instanceof WebUser ? data : new WebUser(data);
		var view = new NavbarView({
			model: model
		});
		view.render();

		model.on('destroy', function() {
			view.close();
			App.vent.trigger('webUser:guest');
			Backbone.history.navigate('post/list', true);
		});
		this.vent.on('logout', model.destroy, model);
	}, App);

	App.vent.on('webUser:guest', function() {
		$('body').removeClass('logged-in').addClass('guest');
		var view = new LoginView();
		view.render();
		$('.login').html(view.el);
	}, App);

	// Alerts
	App.vent.on('alert', function(options) {
		require(['views/alertView'], function(AlertView) {
			var alertView = new AlertView(options);
			App.headRegion.show(alertView);
		});
	});

	// Load code defined on php side in main layout and start the Application.
	require(['onLoad'], function() {
		window.app = App;
		App.start();
		App.router = new Router();
		Backbone.history.start();
	});
});