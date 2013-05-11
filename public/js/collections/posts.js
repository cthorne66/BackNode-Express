define([
  'core',
  'models/post'
  ], function(core, PostModel){

  mv.collections.Posts = Backbone.Collection.extend({
    model: PostModel,
    url: 'api/posts',

    comparator: function(a, b) {
      return Date.parse(a.get('create_date')) < Date.parse(b.get('create_date'));
    }
  });
  return mv.collections.Posts;
});
