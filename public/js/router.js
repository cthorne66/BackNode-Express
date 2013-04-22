define([
  'core',
  'app'
  ], function(core, App) {

  return Backbone.Router.extend({

    routes: {
      ".*"                   : "postList",
      "user/list"            : "userList",
      "user/new"             : "userNew",
      "user/edit/:id"        : "userEdit",
      "user/delete/:id"      : "userDelete",
      "post/list"            : "postList",
      "post/new"             : "postNew",
      "post/edit/:id"        : "postEdit",
      "post/read/:id"        : "postRead"
    },

    // Users
    userList: function() {
      require(['views/user/userListView'], function(UserListView) {
        var view = new UserListView();
        $.when(view.setup())
          .done(function() {
            App.mainRegion.show(view.render());
          });
      });
    },

    userNew: function() {
      require(['views/user/userFormView'], function(UserFormView) {
        var view = mv.i.views.userFormView = new UserFormView();
        $.when(view.setup())
          .done(function() {
            App.mainRegion.show(view.render());
          });
      });
    },

    // Todo: do something if model wasn't found
    userEdit: function(id) {
      require(['views/user/userFormView'], function(UserFormView) {
        var view = mv.i.views.userFormView = new UserFormView();
        $.when(view.setup(id))
          .done(function() {
            App.mainRegion.show(view.render());
          });
      });
    },

    // Posts:
    postList: function() {
      require(['views/post/postListView'], function(PostListView) {
        var view = new PostListView();
        $.when(view.setup())
        .done(function() {
          App.mainRegion.show(view.render());
        });
      });
    },

    postNew: function() {
      require(['views/post/postFormView'], function(PostForm) {
        var view = mv.i.views.postFormView = new PostForm();
        $.when(view.setup())
        .done(function() {
          App.mainRegion.show(view.render());
        });
      });
    },

    // Todo: do something if model wasn't found
    postEdit: function(id) {
      require(['views/post/postFormView'], function(PostForm) {
        var view = mv.i.views.postFormView = new PostForm();
        $.when(view.setup(id))
        .done(function() {
            App.mainRegion.show(view.render());
        });
      });
    },

    // Todo: do something if model wasn't found
    postRead: function(id) {
      require(['views/post/postItemView'], function(PostItemView) {
        var view = new PostItemView();
        $.when(view.setup(id))
        .done(function() {
          App.mainRegion.show(view.render());
        });
      });
    }
  });
});
