define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'bootstrap'
], function($, _, Backbone, Marionette) {
  _.templateSettings = {
    evaluate: /{{([\s\S]+?)}}/g,
    interpolate: /{{=([\s\S]+?)}}/g
  };
  /**
   * Since MongoDB uses the _id as the key attribute, we prototype into the models
   * so we don't have to do this on every model
   */
  Backbone.Model.prototype.idAttribute = '_id';


  /**
   * To effectively set the applicable attribute that represents the ID
   * based on the potentially set idAttribute
   */
  Backbone.Model.prototype.setId = function(id) {
    if (this.idAttribute) {
      this.set(this.idAttribute, id);
    }else{
      this.id = id;
    }
  };

  /**
   * The setting above for idAttribute doesn't currently apply when calling the toJSON()
   * method of a collection so we override the original function to account for that
   */
  Backbone.Model.prototype.toJSON = function(options) {
    var data = _.clone(this.attributes);
    if (this.idAttribute && !data.id) {
      data.id = data[this.idAttribute];
    }
    return data;
  };
  /**
   * The setting above for idAttribute doesn't currently apply when calling the toJSON()
   * method of a collection so we override the original function to account for that
   */
  Backbone.Collection.prototype.toJSON = function(options) {
    return this.map(function(model) {
      var data = model.toJSON(options);
      if (model.idAttribute && !data.id) {
        data.id = data[model.idAttribute];
      }
      return data;
    });
  };
});
