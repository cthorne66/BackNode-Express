define([
  'core',
  'app',
  'models/webUser',
  'text!templates/navbar/login.html'
], function(core, App, WebUser, template) {

  mv.views.LoginView = Backbone.View.extend({
    template : _.template(template),
    events: {
      'submit form': 'submitForm'
    },

    initialize: function() {
      this.model = new WebUser;
    },

    render: function() {
      this.$el.html(this.template());
    },

    submitForm: function(e) {
      e.preventDefault();
      var model = this.model;
      $.ajax({
        type: 'POST',
        url: model.url,
        data: this.$('form').serialize(),
        context: this,
        success: function(data) {
          model.set(data);
          this.close();
          App.vent.trigger('webUser:init', model);
        },
        error: function(jqXHR, textStatus, errorThrown) {
          App.vent.trigger('alert', {
            msg: jqXHR.responseText,
            type:'error'
          });
        }
      });
    },

    close: function() {
      this.remove();
    }
  });
  return mv.views.LoginView;
});
