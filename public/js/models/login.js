define([
  'core'
  ], function() {

  mv.models.Login = Backbone.Model.extend({
    
    defaults:{
      authenticated: false
    }

  });

  return mv.models.Login;
});

