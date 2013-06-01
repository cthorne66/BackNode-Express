var mongoose = require('mongoose'),
	User = mongoose.model('User'),
	moment = require('moment'),
	_ = require('underscore');
_.mixin(require('underscore.deferred'));

var UserController = function(app) {
	var self = this;

	var getWebUserData = function(reqUser){
		var aUser = reqUser.toJSON();
		delete aUser.hashed_password;
		delete aUser.salt;
		return aUser;
	};

	this.signin = function(req, res) {
		//var reqUser = new User(req.body);
		var reqUser = req.user;
		req.login(reqUser, function(err) {
			if (err) {
				return next(err);
			}
			return res.send(getWebUserData(reqUser));
		});
	};

	this.logout = function(req, res) {
		req.logout();
		res.redirect('/');
	};

	this.save = function(req, res) {
		var reqUser = new User(req.body);
		console.log(req.body.id);
		console.log(req.body._id);
		if (req.body._id) {
			//this.update(req, res);
			res.send(500, {
				error: 'something blew up'
			});
		} else {
			create(req, res, reqUser);
		}
	};

	/**
	 * Create user
	 */
	var create = function(req, res, reqUser) {
		_.when(findUserByUserId(reqUser.userName))
			.done(function(existingUsersById) {
			if (existingUsersById && existingUsersById.length > 0) {
				res.send({
					error: ['User ID is not available']
				});
			} else {
				reqUser.save(function(err) {
					if (err) {
						return res.send(500, {
							error: 'unable to create user'
						});
					} else {
						res.send({});
					}
				});
			}
		})
			.fail(function(err) {
			console.log(err);
			return res.send(500, {
				error: 'unable to create user'
			});
		});
	};


	this.index = function(req, res) {
		User.find({}, function(arr, data) {
			res.send(data);
		});
	};

	var errorResponse = function(res, responseCode, msg) {
		return res.send(responseCode, {
			error: msg
		});
	};

	/**
	 * Find user by id
	 */
	this.show = function(req, res) {
		var id = req.params.id;
		User.findOne({
			_id: id
		}, function(err, data) {
			if (!err) {
				res.send(data);
			} else {
				errorResponse(res, 500, 'unable to retreive user');
			}
		});
	};


	this.webUser = function(req, res) {
		try{
			if (!req.isAuthenticated()) {
				res.send({});
			}else{
				var reqUser = req.user;
				res.send(getWebUserData(reqUser));
			}
		}catch(err){
			errorResponse(res, 500, 'unable to retreive user');
		}
	};

	this.logout = function(req, res) {
	  req.logout();
	  res.send();
	};


	// this.find = function(req, res, next, id) {
	// 	User.findOne({
	// 		_id: id
	// 	})
	// 		.exec(function(err, user) {
	// 		if (err) return next(err);
	// 		if (!user) return next(new Error('Failed to load User ' + id));
	// 		req.profile = user;
	// 		next();
	// 	});
	// };

	// var findUserByUserId = function(userName) {
	// 	var dfd = _.Deferred();
	// 	try {
	// 		User.find({
	// 			userName: userName
	// 		}, function(err, users) {
	// 			dfd.resolve(users || []);
	// 		});
	// 	} catch (err) {
	// 		console.log("couldn't file users by id", err);
	// 		dfd.reject();
	// 	}
	// 	return dfd.promise();
	// };



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