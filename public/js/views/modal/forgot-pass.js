define([
  'core',
  'text!templates/modal/forgot-pass.html'
  ], function(core, modalTemplate) {

  mv.views.ModalInputView = Backbone.View.extend({
    
    id: "modal",

    modalTemplate: _.template(modalTemplate),

    events: {
      "click .confirm" : "confirm",
      "click .cancel"  : "cancel"
    },

    initialize: function(options) {
      _.bindAll(this, 'render');

      this.header = options.header;
    },

    render: function() {
      this.$el.html(this.modalTemplate({header: this.header}));

      this.delegateEvents();
      return this;
    },

    confirmAction: function(event) {
      event.preventDefault();
      $('#modal').modal('hide');

      this.close();
      this.model.trigger('modal:forgotpass');
    },

    cancelAction: function(event) {
      event.preventDefault();
      $('#modal').modal('hide');

      this.close();
      this.model.trigger('modal:cancel');
    },

    close: function() {
      this.undelegateEvents();
      this.remove();
    }

  });

  return mv.views.ModalInputView;
});
