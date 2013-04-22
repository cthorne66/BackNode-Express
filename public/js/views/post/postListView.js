define([
  'core',
  'collections/posts',
  'text!templates/post/tplPostList.html',
  'app',
  'views/modal/confirm'
  ], function(core, Posts, template, App, ModalConfirmView) {

  mv.views.PostListView  = Backbone.View.extend({
    template : _.template(template),

    initialize: function(options) {},

    setup: function(){
      var dfd = $.Deferred();
      this.collection = new Posts();
      this.collection.on('error', this.error, this);

      $.when(this.collection.fetch())
      .done(function(){
        dfd.resolve();
      })
      .fail(function(err){
        console.log(err);
        dfd.reject();
      });
      return dfd.promise();
    },

    render: function() {
      this.$el.html(this.template({posts:this.collection.toJSON()}));
      return this;
    },

    events: {
      'click a.delete' : 'delete',
      'click a.edit'   : 'edit'
    },

    edit: function(e){
      e.preventDefault();
      var id = $(e.target).parent('a').data('id');
      Backbone.history.navigate('post/edit/' + id, true);
    },

    delete: function(e) {
      event.preventDefault();
      var id = $(e.target).parent('a').data('id');
      //var model = _.find(this.collection.toJSON(), function(x){ return x.id == id; });

      var modalConfirmView = new ModalConfirmView({
        model  : this.collection.get(id),
        header : 'Confirm Delete',
        body   : 'Are you sure you want to delete this item?'
      });
      $('.head').html(modalConfirmView.render().el);
    },

    confirmDelete: function() {
      $.when(this.model.destroy()).done(this.close);
    },

    error: function(model, response) {
      App.vent.trigger('alert', {
        msg: response.responseText ? response.responseText : response.statusText,
        type: 'error'
      });
    },

    close: function() {
      this.undelegateEvents();
      this.collection.off('error', this.error);
      this.remove();
    }
  });
  return mv.views.PostListView;
});