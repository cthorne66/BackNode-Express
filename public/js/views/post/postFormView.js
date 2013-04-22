define([
  'core',
  'models/post',
  'collections/comments',
  'text!templates/post/tplPostForm.html',
  'app',
  'backboneModelBinding'
  ], function(core, Post, CommentCollection, template, App, ModelBinder) {

  mv.views.PostFormView = Backbone.View.extend({
    template : _.template(template),
    modelBinder: null,

    initialize: function(options) {
      _.bindAll(this, 'render','close');
      this.modelBinder = new ModelBinder();
    },

    setup: function(id){
      var self = this,
        dfd = $.Deferred();
      
      self.model = new Post();
      self.model.on('error', self.error);
      self.model.on('sync', self.success);

      if(typeof id === 'undefined'){
        dfd.resolve();
      }else{
        self.model.set({id:id});
        $.when(self.model.fetch())
        .done(function(){
          dfd.resolve();
        })
        .fail(function(err){
          console.log(err);
          dfd.reject();
        });
      }

      return dfd.promise();
    },

    render: function(){
      this.$el.html(this.template(this.model.toJSON()));
      this.modelBinder.bind(this.model, this.el, this.bindings);
      return this;
    },

    bindings: {
      title: '#title',
      content: '#content'
    },

    events: {
      'click button[name=save]'   : 'save',
      'click button[name=cancel]' : 'cancel'
    },

    save: function(event) {
      event.preventDefault();
      var self = this;
      $.when(self.model.save())
        .done(function(){
          App.vent.trigger('alert', {
            msg: 'Post "' + self.model.get('title') + '" updated.',
            type: 'success'
          });
          Backbone.history.navigate('post/list', true);
        })
        .fail(function(err){
          App.vent.trigger('alert', {
            msg: err.responseText ? err.responseText : err.statusText,
            type: 'error'
          });
        });
    },

    cancel: function(event) {
      event.preventDefault();
      Backbone.history.navigate('post/list', true);
    },

    close: function() {
      this.model.off('sync', this.success);
      this.model.off('error', this.error);
      this.modelBinder.unbind();
      this.undelegateEvents();
      this.remove();
    }
  });
  return mv.views.PostFormView;
});
