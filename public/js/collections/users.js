define([
  'core',
  'models/user'
  ], function(core, UserModel){

  mv.collections.Users = Backbone.Collection.extend({

    model: UserModel,
    url: 'api/users'

  });

  return mv.collections.Users;
});
