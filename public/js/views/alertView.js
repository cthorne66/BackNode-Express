define([
  'core',
  'text!templates/alert.html'
], function(core, template) {

  mv.views.Alert = Backbone.View.extend({
    template: _.template(template),
    events: {
      "click .close" : "close"
    },

    initialize: function(options) {
      this.msg = options.msg;
      this.type = options.type;
      this.$el.alert();
    },

    render: function() {
      this.$el.html(this.template({msg: this.msg, type: this.type}));
    },

    close: function() {
      this.remove();
      this.undelegateEvents();
    },

    onShow: function() {
      $('html, body').animate({ scrollTop: 0 }, 'slow');
    }
  });
  return mv.views.Alert;
});
