define(['core','moment'], function() {

    mv.models.Comment = Backbone.Model.extend({

        urlRoot: 'api/post/comment',

        defaults: {
            postId: 0,
            content: '',
            userId: '',
            createDate: ''
        }

    });

    return mv.models.Comment;
});
