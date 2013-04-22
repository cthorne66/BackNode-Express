define([
  'core',
  'models/user',
  'text!templates/user/tplUserForm.html',
  'app',
  'backboneModelBinding'
  ], function(core, User, template, App, ModelBinder) {

  mv.views.UserFormView = Backbone.View.extend({
    template : _.template(template),
    modelBinder: null,

    initialize: function(options) {
      this.modelBinder = new ModelBinder();
    },

    setup: function(id){
      var self = this,
        dfd = $.Deferred();
      
      self.model = new User();
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

    render: function() {
      var isNew = this.model.isNew();
      var data = _.extend(this.model.toJSON(),{isNew: isNew});
      this.$el.html(this.template(data));
      this.modelBinder.bind(this.model, this.el, this.bindings);
      return this;
    },

    bindings: {
      fname: '#fname',
      lname: '#lname',
      email: '#email',
      username: '#username',
      password: 'input:password',
      role: '#role'
    },

    events: {
      'click button[name=save]'   : 'save',
      'click button[name=cancel]' : 'cancel'
    },

    save: function(event) {
      event.preventDefault();
      var self = this;
      $.when(this.model.save())
        .done(function(){
          App.vent.trigger('alert', {
            msg: 'User "' + self.model.get('username') + '" updated.',
            type: 'success'
          });
          Backbone.history.navigate('user/list', true);
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
      Backbone.history.navigate('user/list', true);
    },

    close: function() {
      this.model.off('error', this.error);
      this.model.off('sync', this.success);
      this.modelBinder.unbind();
      this.undelegateEvents();
      this.remove();
    }
  });
  return mv.views.UserFormView;
});
