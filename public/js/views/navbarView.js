define([
  'core',
  'app',
  'text!templates/navbar/dropdown.html'
  ], function(core, App, template) {

  mv.views.NavbarView = Backbone.View.extend({
    template : _.template(template),
    events: {
      "click #logout"   : "logout"
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      $('#nav-menu').html(this.el);
    },

    logout: function(event) {
      event.preventDefault();
      App.vent.trigger('logout');
    },

    close: function() {
      this.undelegateEvents();
      this.remove();
    }
  });
  return mv.views.NavbarView;
});
