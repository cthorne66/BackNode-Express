define([
  'core',
  'models/comment',
  'collections/comments'
  ], function(core, CommentModel, CommentCollection) {

  mv.models.Post = Backbone.Model.extend({

    urlRoot: 'api/postwithcomments',

    defaults: {
      title: '',
      content: '',
      create_date: '',
      is_deleted: null,
      user_id: '',
      comments: []
    }

  });
  return mv.models.Post;
});
