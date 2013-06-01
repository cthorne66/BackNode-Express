var express = require('express'),
  mongoStore = require('connect-mongo')(express),
  oneDay = 86400000;

module.exports = function(app, config, passport) {

  app.set('title', config.app.title);
  app.set('showStackError', true);
  app.use(express.compress());
  app.use(express.favicon());

  app.configure(function() {

    app.use(express.logger('dev'));
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.methodOverride());

    app.use(express.session({
      secret: 'noobjs',
      store: new mongoStore({
        url: config.db,
        collection: 'sessions'
      })
    }));

    // use passport session
    app.use(passport.initialize());
    app.use(passport.session());

    // routes should be at the last
    app.use(app.router);
    app.use(express.static(config.root + '/public', {
      maxAge: oneDay
    }));

    // assume "not found" in the error msgs
    // is a 404. this is somewhat silly, but
    // valid, you can do whatever you like, set
    // properties, use instanceof etc.
    // app.use(function(err, req, res, next) {
    //  // treat as 404
    //  if (~err.message.indexOf('not found')) return next()

    //  // log it
    //  console.error(err.stack)

    //  // error page
    //  res.status(500).render('500', {
    //    error: err.stack
    //  })
    // })

    // // assume 404 since no middleware responded
    // app.use(function(req, res, next) {
    //  res.status(404).render('404', {
    //    url: req.originalUrl,
    //    error: 'Not found'
    //  })
    // })
  });
};
