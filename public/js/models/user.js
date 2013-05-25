define([
  'core',
  'models/post',
  'models/comment',
  'collections/posts',
  'collections/comments'
  ], function(core, PostModel, CommentModel, PostCollection, CommentCollection) {

  mv.models.User = Backbone.Model.extend({

    urlRoot: 'api/user',

    // urlRoot: function(){
    //   if (this.isNew()){
    //     return "api/user";
    //   } else {
    //     return "api/user/" + this.id;
    //   }
    // },


    idAttribute: "_id",

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
