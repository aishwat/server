var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionnaireSchema = new Schema({
  title:String,
  questions:[
    {
      "#":String,
      "que":String,
      "opt1":String,
      "opt2":String,
      "opt3":String,
      "opt4":String,
      "opt5":String,
      "ans":String
    }
  ]
});

module.exports = questionnaireSchema;