var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var validator = require('validator');

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

var userSchema = new Schema({
  // _id:  String, //custom _id , instead of using id and _id both
  firstName:  {
  	type:String,
  	required: true,
  },
  lastName: {
  	type:String,
  	required: true,
  },
  email: {
  	type:String,
  	trim: true,
    lowercase: true,
  	required: 'Email address is required',
  	index: true,
  	unique: true,
  	validate: [ validator.isEmail, 'Invalid Email' ]
  },
  address: String,
  phone: String,
  password:  {
  	type:String,
  	required: true
  },
  role: String,
  avatar:String,
  refresh_token:String
});

module.exports = userSchema;