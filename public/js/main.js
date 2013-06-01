// Define jQuery as AMD module
define.amd.jQuery = true;

define([
	'core',
	'domReady',
	'router',
	'app',
	'models/webUser',
	'collections/comments',
	'views/searchView',
	'views/userNavbarView'
	], function(core, domReady, Router, App, WebUser, CommentCollection, SearchView, UserNavbarView) {

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

	// Alerts
	App.vent.on('alert', function(options) {
		require(['views/alertView'], function(AlertView) {
			var alertView = new AlertView(options);
			App.headRegion.show(alertView);
		});
	});

	window.app = App;
	App.start();
	App.router = new Router();
	Backbone.history.start();
	var userNav = new UserNavbarView({el: '#user-navbar'});
});