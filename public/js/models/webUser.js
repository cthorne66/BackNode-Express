define([
  'core'
  ], function() {

  mv.models.WebUser = Backbone.Model.extend({
    url: 'api/webUser',

    defaults: {
      fname: '',
      lname: '',
      email: '',
      password: '',
      createDate: '',
      role: ''
    }
  });
  return mv.models.WebUser;
});

