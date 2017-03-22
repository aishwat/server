var jwt = require('jsonwebtoken');
var randtoken = require('rand-token');

var auth = {
	generate:function(req,res){
		var token = jwt.sign({ user_id: "123" }, 'app@123',{ expiresIn: '1h' },function(err,token){
			var refresh_token = randtoken.generate(32);
			res.send({access_token:token,refresh_token:refresh_token,expires_in:3600,token_type:"Bearer"});
		});
	},
	validate:function(req,res){

		var token = req.headers.authorization.substr(7);
		console.log(token);
		jwt.verify(token, 'app@123', function(err, decoded) {
			if(err)
				res.send(err);
			res.send(decoded);
		  // err 
		  // decoded undefined 
		});
	}
}

module.exports = auth;