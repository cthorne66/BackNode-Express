define([
  'core'
  ], function(core) {

  mv.views.Home = Backbone.View.extend({

    // template: _.template(),

    events: {

    },

    initialize: function(options) {
      _.bindAll(this, 'render');
      this.vent = options.vent;
    },

    render: function() {

    },

    close: function() {
      this.remove();
      this.undelegateEvents();
    }

  });

  return mv.views.Home;
});
