define([
  'core',
  'collections/users',
  'text!templates/user/tplUserList.html',
  'app'
  ], function(core, Users, template, App) {

  mv.views.UserListView = Backbone.View.extend({
    template : _.template(template),

    initialize: function(options) {

    },

    setup: function(){
      var self = this,
        dfd = $.Deferred();
      this.collection = new Users();
      this.collection.on('error', this.error, this);

      $.when(this.collection.fetch())
        .done(function(){
          dfd.resolve();
        })
        .fail(function(err){
          console.log(err);
          dfd.reject();
        });
      return dfd.promise();
    },

    render: function() {
      this.$el.html(this.template({users:this.collection.toJSON()}));
      return this;
    },

    error: function(model, response) {
      App.vent.trigger('alert', {
        msg: response.responseText ? response.responseText : response.statusText,
        type: 'error'
      });
    },

    close: function() {
      this.undelegateEvents();
      this.remove();
    }

  });
  return mv.views.UserListView;
});
