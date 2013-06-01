define([
  'core',
  'app',
  'models/webUser',
  'text!templates/navbar/navbar.html'
], function(core, App, WebUser, template) {

  mv.views.UserNavbarView = Backbone.View.extend({
    isLoggedIn: false,
    template : _.template(template),
    events: {
      'change [name="userName"]': 'updateUserName',
      'change [name="password"]': 'updatePassword',
      'submit form': 'login',
      'click #logout'   : 'logout'
    },

    initialize: function() {
      var self = this;
      this.model = new WebUser();
      $.when(this.model.fetch()).done(function(){
        self.setIsLoggedIn();
        self.render();
      }).fail(function(err){
        console.log(err);
      });
    },

    setIsLoggedIn: function(){
      if(this.model.id){
        this.isLoggedIn = true;
      }else{
        this.isLoggedIn = false;
      }
    },

    render: function() {
      data = this.model.toJSON();
      data.isLoggedIn = this.isLoggedIn;
      this.$el.html(this.template(data));
    },

    updateUserName: function(event){
      this.model.set('userName', event.target.value);
    },

    updatePassword: function(event){
      this.model.set('password', event.target.value);
    },

    login: function(event) {
      event.preventDefault();
      var self = this;
      $.ajax({
        type: 'POST',
        url: self.model.url,
        data: self.model.toJSON()
      }).done(function(data){
          self.model.set(data);
          self.setIsLoggedIn();
          self.render();
      }).fail(function(err){
        console.log(err);
      });
    },

    logout: function(event) {
      event.preventDefault();
      var self = this;
      $.ajax({
        url: 'api/webUser/logout'
      }).done(function(){
        self.model = new WebUser();
        self.setIsLoggedIn();
        self.render();
        Backbone.history.navigate('/', true);
      }).fail(function(err){
        console.log(err);
      });
    }

  });
  return mv.views.UserNavbarView;
});
