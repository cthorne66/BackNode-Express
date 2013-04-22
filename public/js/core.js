define([
  'jquery',
  'underscore',
  'backbone',
  'marionette',
  'bootstrap'
], function($, _, Backbone, Marionette) {

  _.templateSettings = {
    evaluate    : /{{([\s\S]+?)}}/g,
    interpolate : /{{=([\s\S]+?)}}/g
  };

  Backbone.Model.prototype.toJSON = function(recursive) {
      return (!recursive) ? _.clone(this.attributes) :JSON.parse(JSON.stringify(this));
  };

});
