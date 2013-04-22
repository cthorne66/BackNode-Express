define([
  'core',
  'models/comment'
  ], function(core, CommentModel){

  mv.collections.Comments = Backbone.Collection.extend({
    model: CommentModel,
    url: 'api/comment'
  });
  return mv.collections.Comments;
});
