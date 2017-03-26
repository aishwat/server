var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tmpUserSchema = new Schema({ 
	createdAt: { 
		type: Date, 
		expires: '3600s',
		default: Date.now 
	},
	firstName:String,
	
});

module.exports = tmpUserSchema;