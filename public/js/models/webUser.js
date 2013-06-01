define([
  'core'
  ], function() {

  mv.models.WebUser = Backbone.Model.extend({
    url: 'api/webUser',

    defaults: {
      firstName: '',
      lastName: '',
      userName: '',
      email: '',
      password: '',
      createDate: 0,
      role: ''
    }
  });
  return mv.models.WebUser;
});

