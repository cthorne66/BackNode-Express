define(['core','moment'], function() {

    mv.models.Comment = Backbone.Model.extend({

        urlRoot: 'api/post/comment',

        defaults: {
            postId: '',
            commentId: '',
            content: '',
            userId: '',
            createDate: ''
        }

    });

    return mv.models.Comment;
});
