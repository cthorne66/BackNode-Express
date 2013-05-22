
/**
 * Module dependencies.
 */

var mongoose = require('mongoose'),
  User = mongoose.model('User'),
  _ = require('underscore'),
  moment = require('moment');


var UserController = function(app) {


  // this.save = function(req, res) {
  //   var reqUser = new User(req.body);
  //   if(reqUser.id){
  //     //this.update(req, res);
  //   }else{
  //     this.create(req, res, reqUser);
  //   }
  // };


  /**
   * Create user
   */
  this.create = function(req, res, reqUser) {
    existingUsersById = findUserByUserId(user.userId);
    if(existingUsersById.length > 0){
      res.send({error:['User ID is not available']});
    }else{
      reqUser.save(function(err) {
        if(err) {
          return res.send(500, {error: 'unable to create user'});
        }else{
          res.send({});
        }
      });
    }
  };



  /**
   * Find user by id
   */

  // this.user = function(req, res, next, id) {
  //   User
  //     .findOne({ _id: id })
  //     .exec(function(err, user) {
  //       if (err) return next(err);
  //       if (!user) return next(new Error('Failed to load User ' + id));
  //       req.profile = user;
  //       next();
  //     });
  // };


  var findUserByUserId = function(userId) {
    try {
      User.find({
        userId: userId
      }, function(err, users) {
          return users || [];
      });
    } catch (err) {
      console.log("couldn't file users by id", err);
      return [];
    }
  };




  /**
   * Create user
   */
  // this.create = function(req, res) {
  //   var user = new User(req.body);
  //   user.provider = 'local';
  //   user.save(function(err) {
  //     if (err) {
  //       //return res.render('users/signup', { errors: err.errors, user: user });
  //       return res.send(500, {error: 'unable to create user'});
  //     }
  //     req.logIn(user, function(err) {
  //       if (err) return next(err);
  //       return res.send({});
  //     });
  //   });
  // };

// /**
//  *  Show profile
//  */

// this.show = function(req, res) {
//   var user = req.profile;
//   res.render('users/show', {
//     title: user.name,
//     user: user
//   });


// };

// module.exports = UserController;

// exports.signin = function(req, res) {};

// /**
//  * Auth callback
//  */

// exports.authCallback = function(req, res, next) {
//   res.redirect('/');
// };

// /**
//  * Show login form
//  */

// exports.login = function(req, res) {
//   res.render('users/login', {
//     title: 'Login',
//     message: req.flash('error')
//   });
// };

// /**
//  * Show sign up form
//  */

// exports.signup = function(req, res) {
//   res.render('users/signup', {
//     title: 'Sign up',
//     user: new User()
//   });
// };

// /**
//  * Logout
//  */

// exports.logout = function(req, res) {
//   req.logout();
//   res.redirect('/login');
// };

// /**
//  * Session
//  */

// exports.session = function(req, res) {
//   res.redirect('/');
// };
};
module.exports = UserController;