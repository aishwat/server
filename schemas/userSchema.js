var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  // _id:  String, //custom _id , instead of using id and _id both
  first: String,
  last:   String,
  email:String,
  phone:String,
  avatar:String
});

module.exports = userSchema;