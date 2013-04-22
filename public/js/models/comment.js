define([
  'core'
  ], function() {

  mv.models.Comment = Backbone.Model.extend({
    
    urlRoot: 'api/comment'

  });

  return mv.models.Comment;
});
