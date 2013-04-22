define([
  'core'
], function(core) {

  var App = new Backbone.Marionette.Application;
  App.addRegions({
    mainRegion: '.main',
    headRegion: '.head'
  });
  return App;
});
