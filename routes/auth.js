var jwt = require('jsonwebtoken');
var randtoken = require('rand-token');
var mongoose = require('mongoose');

var userSchema = require('../schemas/userSchema.js');
var User = mongoose.model('User', userSchema);

var tmpUserSchema = require('../schemas/tmpUserSchema.js');
var TmpUser = mongoose.model('TmpUser', tmpUserSchema);

var email_transporter = require('./email_transporter.js');

var bcrypt = require('bcrypt-nodejs')


var auth = {
	signup:function(req,res){
		var user = {
			firstName: req.body.firstName,
			lastName:  req.body.lastName,
			email: req.body.email,
			phone: req.body.phone
		}
		bcrypt.hash(req.body.password, null, null, function(err, _hash) {
			if(err)
				res.send(_err);
			else{
				user.hash = _hash;
				jwt.sign(user, 'T3SC0_@2017',{ expiresIn: '1h' },function(_err,_token){
					if(_err)
						res.send(_err);
					else{
						console.log("at 3");
						email_transporter.sendMail({to:'aishwat.singh@gmail.com',token:_token}, function(__err,info) {
							if (__err) 
								res.send(_err);
							else
								res.send('Message Id: '+ info.messageId+ "\nMessage Response: " +info.response);
						});
					}
				});
			}
		});

	},
	signup_verified: function(req,res){
		var token = req.query.token;
		console.log(token);
		jwt.verify(token, 'T3SC0_@2017', function(err, decoded) {
			if(err){
				res.send("verification failed");
			}
			else{
				var refresh_token = randtoken.generate(32);
				var user = new User({
					firstName: decoded.firstName,
					lastName:  decoded.lastName,
					email: decoded.email,
					phone: decoded.phone,
					password:decoded.hash,
					refresh_token:refresh_token
				})
				user.save(function(_err,doc){
					if(_err){
						res.status(500).send(_err);
					}
					else{
						var _user = {
							email:doc.email,
							phone:doc.phone,
							_id:doc._id
						}
						jwt.sign(_user, 'T3SC0_@2017',{ expiresIn: '3h' },function(__err,_token){
							res.send({access_token:_token,refresh_token:refresh_token,expires_in:"3h",token_type:"Bearer"});
						});

					}
				});
			}
		});
	},
	login: function(req,res){
		User.findOne({email:req.body.email},function(err,doc){
			if(err){
				res.send(err);
			}
			else{
				bcrypt.compare(req.body.password, doc.password, function(_err, result) {
					if(_err){
						res.send(_err);
					}
					else if(result){
						var refresh_token = randtoken.generate(32);
						User.findByIdAndUpdate(doc._id,{ $set: {'refresh_token':refresh_token}} , {new:true},function(__err,_doc){
							if(__err){
								res.send(__err);
							}
							else{
								var _user = {
									email:_doc.email,
									phone:_doc.phone,
									_id:_doc._id
								}
								jwt.sign(_user, 'T3SC0_@2017',{ expiresIn: '60s' },function(___err,_token){
									res.send({access_token:_token,refresh_token:_doc.refresh_token,expires_in:"60s",token_type:"Bearer"});
								});
							}
						})
					}
					else {
						res.send('Invalid password');
					}
				});
			}
		})
	},
	validate:function(req,res,next){

		var token = req.headers.authorization.substr(7);
		console.log(token);
		jwt.verify(token, 'T3SC0_@2017', function(err, decoded) {
			if(err){
				res.send(err);
			}
			else{
				res.send(decoded);
				// req.decoded = decoded;
				// next();
			}
		});
	},
	refresh:function(req,res){
		var token = req.headers.authorization.substr(7);
		jwt.verify(token, 'T3SC0_@2017', function(err, decoded) {
			if(err && err.name!=="TokenExpiredError"){
				res.send(err);
			}
			else{
				//valid token
				var decoded = jwt.decode(token);//to get _id
				var refresh_token = randtoken.generate(32);
				console.log(decoded._id + " "+req.query.refresh_token );

				User.findOneAndUpdate({$and:[{_id:decoded._id},{refresh_token:req.query.refresh_token}]},{ $set: {'refresh_token':refresh_token}} , {new:true},function(_err,_doc){
					if(_err){
						res.send(_err);
					}
					else if(_doc==null){
						res.send("Invalid refresh_token");
					}
					else{
						var _user = {
							email:_doc.email,
							phone:_doc.phone,
							_id:_doc._id
						}
						jwt.sign(_user, 'T3SC0_@2017',{ expiresIn: '60s' },function(___err,_token){
							res.send({access_token:_token,refresh_token:_doc.refresh_token,expires_in:"60s",token_type:"Bearer"});
						});
					}
				})
			}
		});
	}
}

module.exports = auth;