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
      fname: '',
      lname: '',
      email: '',
      username: '',
      password: '',
      create_date: '',
      role: ''
    }
  });
  return mv.models.User;
});
