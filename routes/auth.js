var jwt = require('jsonwebtoken');
var randtoken = require('rand-token');
var mongoose = require('mongoose');

var userSchema = require('../schemas/userSchema.js');
var User = mongoose.model('User', userSchema);

var tmpUserSchema = require('../schemas/tmpUserSchema.js');
var TmpUser = mongoose.model('TmpUser', tmpUserSchema);

var email_transporter = require('./email_transporter.js');

var bcrypt = require('bcrypt-nodejs');

var request = require('request');


var auth = {
	signup : function(req, res){
		// Check if email is already registered ?
		var user = {
			firstname: req.body.firstname,
			lastname:  req.body.lastname,
			email: req.body.email,
			phone: req.body.phone
		};

		bcrypt.hash(req.body.password, null, null, function(err, hash){
			if(err){
				return res.status(500).send();
			}
			user.hash = hash;
			jwt.sign(user, 'T3SC0_@2017', {expiresIn : '1h'}, function(err, token){
				if(err){
					return res.status(500).send();
				}
				email_transporter.sendMail({
					to : req.body.email,
					token : token
				}, function(err, info){
					console.log(info);
					if(err){
						return res.status(500).send();
					}
					//res.json sets content-type to application/json res.send does not
					res.json({
						messageId : info.messageId,
						response : info.response
					});
				});
			});
		});
	},
	signup_verified : function(req, res){
		jwt.verify(req.query.token, 'T3SC0_@2017', function(err, decoded) {
			if(err){
				return res.status(500).send('Error verifying!');
			}
			var refresh_token = randtoken.generate(32);

			var user = new User({
				firstname: decoded.firstname,
				lastname:  decoded.lastname,
				email: decoded.email,
				phone: decoded.phone,
				password: decoded.hash,
				refresh_token: refresh_token
			});
			console.log(user);
			user.save(function(err, doc){
				if(err){
					return res.status(500).send('Error saving user!');
				}
				// var user = {
				// 	id:doc._id,
				// 	firstname:doc.firstname,
				// 	lastname:doc.lastname,
				// 	email: doc.email,
				// 	phone: doc.phone
				// };
				// jwt.sign(user, 'T3SC0_@2017', {expiresIn: '3h'}, function(err, token){
				// 	res.json({
				// 		access_token: token,
				// 		refresh_token: refresh_token,
				// 		expires_in: '3h',
				// 		token_type: 'Bearer'
				// 	});
				// });
				res.redirect('/');
			});

		});
	},

	login : function(req, res){
		User.findOne({email: req.body.email}, function(err, doc){
			if(err || !doc){
				return res.status(500).send();
			}
			bcrypt.compare(req.body.password, doc.password, function(err, result) {
				if(err || !result){
					/* it is better security to not tell specifically
					whether username or password is incorrect, just say 'Username and password mismatch'.
					This prevents a hacker from finding out whether an account is registered on
					a website or not.
					*/
					return res.status(500).send();
				}
				var refresh_token = randtoken.generate(32);
				User.findByIdAndUpdate(doc._id, { $set: {'refresh_token': refresh_token}}, {new: true}, function(err, doc){
					if(err){
						return res.status(500).send();
					}

					var user = {
						id:doc._id,
						firstname : doc.firstname,
						lastname:doc.lastname,
						email: doc.email
					}
					jwt.sign(user, 'T3SC0_@2017', {expiresIn: '60s'}, function(err, token){
						if(err){
							return res.status(500).send();
						}
						res.json({
							user:user,
							access_token: token,
							refresh_token: doc.refresh_token,
							expires_in: '60s',
							token_type: 'Bearer'
						});
					});
				});
			});
		});
	},
	validate : function(req, res, next){
		var token = req.headers.authorization.substr(7);
		jwt.verify(token, 'T3SC0_@2017', function(err, decoded) {
			if(err){
				return res.status(500).send();
			}
			res.send(decoded);
		});
	},
	refresh : function(req, res){
		var token = req.headers.authorization.substr(7);
		jwt.verify(token, 'T3SC0_@2017', function(err, decoded) {
			if(err && err.name !== 'TokenExpiredError'){
				return res.status(500).send();
			}
			//valid token
			var decoded = jwt.decode(token);//to get _id
			var refresh_token = randtoken.generate(32);
			console.log(decoded._id + " "+req.query.refresh_token );

			User.findOneAndUpdate({$and:[{_id:decoded._id},{refresh_token:req.query.refresh_token}]},{ $set: {'refresh_token':refresh_token}} ,{new:true}, function(err, doc){
				if(err || !doc){
					return res.status(500).send();
				}
				var user = {
					email: doc.email,
					phone: doc.phone,
					_id: doc._id
				}
				jwt.sign(user, 'T3SC0_@2017',{ expiresIn: '60s' },function(err, token){
					if(err){
						return res.status(500).send();
					}
					res.json({
						access_token: token,
						refresh_token: doc.refresh_token,
						expires_in: '60s',
						token_type: 'Bearer'
					});
				});
			})
		});
	},
	fb_callback : function(req, res){
		console.log("GOT CALLBACK");
		console.log(req.query);
		// https://www.facebook.com/v2.8/dialog/oauth?%20client_id=1441995542511342&redirect_uri=http://localhost:3000/auth/facebook/callback&response_type=code&scope=email&auth_type=rerequest
		var client_id="1441995542511342";
		var client_secret="dd90443be0e0da08cc8edcec3181d8f0";
		var redirect_uri="http://localhost:3000/auth/facebook/callback";

		if(req.query.code){
			var token_url = 'https://graph.facebook.com/v2.8/oauth/access_token?client_id='+client_id+'&redirect_uri='+redirect_uri+'&client_secret='+client_secret+'&code='+req.query.code;
			console.log(token_url)
			request(token_url, function (err, response) {
				console.log("TRYING TOKEN");
				console.log(response.statusCode);
				if(err || response.statusCode !== 200){
					console.log("at 3");
					return res.status(500).send();
				}

				var body = JSON.parse(response.body);
				var expires_in = body.expires_in;
				var access_token = body.access_token;

				console.log("access_token:"+body.access_token);

				var profile_uri="https://graph.facebook.com/v2.8/me?fields=first_name,last_name,email"
				request(profile_uri + "&access_token=" + access_token, function(err, response){
					if(err || response.statusCode !== 200){
						console.log("at 4");
						return res.status(500).send();
					}
					else if(response.body && !JSON.parse(response.body).email){
						return res.send("Please try again and provide email permission");
					}
					res.json(JSON.parse(response.body));
				});
			});
		}
	}
};

module.exports = auth;
