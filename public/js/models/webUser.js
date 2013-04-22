define([
  'core'
  ], function() {

  mv.models.WebUser = Backbone.Model.extend({
    url: 'api/webUser'
  });
  return mv.models.WebUser;
});

