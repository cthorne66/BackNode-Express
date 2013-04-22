define([
  'core',
  'app',
  'models/post',
  'views/modal/confirm',
  'text!templates/post/tplPostItem.html'
  ], function(core, App, Post, ModalConfirmView, template) {

  mv.views.PostItemView = Backbone.View.extend({
    template : _.template(template),
    events: {
      'click a.delete' : 'delete',
      'click a.read'   : 'read',
      'click a.edit'   : 'edit'
    },

    initialize: function(options) {
      _.bindAll(this, 'render','confirmDelete', 'close');
    },

    setup: function(id){
      var self = this,
        dfd = $.Deferred(),
        post = new Post({id:id});

      $.when(post.fetch())
      .done(function(){
        self.model = post;
        //self.model.fetchRelated('comments');
        self.model.on('error', self.error);
        self.model.on('modal:confirm', self.confirmDelete);
        dfd.resolve();
      })
      .fail(function(err){
        dfd.reject();
      });
      return dfd.promise();
    },

    render: function(template) {
      var self = this;
      var data = this.model.toJSON();
      data.author = self.model.get('author') ? self.model.get('author').toJSON() : '';
      self.$el.html(self.template(data));
      return this;
    },

    read: function(event){
      event.preventDefault();
      Backbone.history.navigate('post/read/' + this.model.id, true);
    },

    edit: function(event){
      event.preventDefault();
      Backbone.history.navigate('post/edit/' + this.model.id, true);
    },

    delete: function(event) {
      event.preventDefault();

      var modalConfirmView = new ModalConfirmView({
        model  : this.model,
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
      this.model.off('error', this.error);
      this.model.off('modal:confirm', this.confirmDelete);
      this.undelegateEvents();
      this.remove();
    }
  });
  return mv.views.PostItemView;
});
