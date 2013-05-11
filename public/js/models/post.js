define([
  'core',
  'models/comment',
  'collections/comments',
  'moment'
  ], function(core, CommentModel, CommentCollection) {

  mv.models.Post = Backbone.Model.extend({

    urlRoot: 'api/post',

    defaults: {
      title: '',
      content: '',
      createDate: '',
      isDeleted: null,
      userId: '',
      comments: []
    }

  });
  return mv.models.Post;
});
