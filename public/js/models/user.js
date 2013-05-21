define([
  'core',
  'models/post',
  'models/comment',
  'collections/posts',
  'collections/comments'
  ], function(core, PostModel, CommentModel, PostCollection, CommentCollection) {

  mv.models.User = Backbone.Model.extend({

    urlRoot: 'api/user',

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
  return mv.models.User;
});
