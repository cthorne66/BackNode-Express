define([
  'core',
  'models/post',
  'datejs'
  ], function(core, PostModel){

  mv.collections.Posts = Backbone.Collection.extend({
    model: PostModel,
    url: 'api/postwithcomments',

    comparator: function(a, b) {
      return Date.parse(a.get('create_date')) < Date.parse(b.get('create_date'));
    }
  });
  return mv.collections.Posts;
});
