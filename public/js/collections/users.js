define([
  'core',
  'models/user'
  ], function(core, UserModel){

  mv.collections.Users = Backbone.Collection.extend({

    model: UserModel,
    url: 'api/user'

  });

  return mv.collections.Users;
});
