var mongoose = require('mongoose');
var userSchema = require('../schemas/userSchema.js');
var User = mongoose.model('User', userSchema);

var users = {
	save: function(req,res){
		var user = new User({
			first: req.body.first,
			last:  req.body.last,
			email: req.body.email,
			phone: req.body.phone
		})
		user.save(function(err,user){
			if(err){
				console.log(err);
			}
			else{
				res.status(201).send("saved "+user);
			}
		});
	},
	update: function(req,res){
		var tmp ={
			first: req.body.first,
			last:  req.body.last,
			email: req.body.email,
			phone: req.body.phone
		}
		User.findByIdAndUpdate(req.params.id, tmp, {new:true},function(err,result){
			if(err){
				console.log(err);
			}
			else{
				res.status(200).send(result);
			}
		})
	},
	list: function(req,res){
		User.find({},function(err,result){
			if(err){
				console.log(err);
			}
			else{
				res.status(200).send(result);
			}
		})
	},
	getById: function(req,res){
		User.findById(req.params.id,function(err,result){
			if(err){
				console.log(err);
			}
			else{
				res.status(200).send(result);
			}
		})
	},
	deleteById: function(req,res){
		User.findByIdAndRemove(req.params.id,function(err,result){
			if(err){
				console.log(err);
			}
			else{
				res.status(200).send("Deleted " +req.params.id);
			}
		})
	}
}

module.exports = users;