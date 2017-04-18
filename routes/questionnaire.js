var formidable = require('formidable');
var util = require('util');
var fs = require('fs');
var mongoose = require('mongoose');
var questionnaireSchema = require('../schemas/questionnaireSchema.js');
var Questionnaire = mongoose.model('Questionnaire', questionnaireSchema);

var questionnaire = {
	list:function(req,res){
		Questionnaire.find({},'title -_id',function(err,result){
			if(err){
				console.log(err);
			}
			else{
				res.status(200).send(result);
			}
		})
	},
	getByTitle: function(req,res){
		Questionnaire.find({"title":req.params.title},function(err,result){
			if(err){
				console.log(err);
			}
			else{
				res.status(200).send(result);
			}
		})
	},
	upload:function(req,res){
		var form = new formidable.IncomingForm();
		form.uploadDir = "./questionnaires/";
		form.maxFieldsSize = 2 * 1024 * 1024;
		form.multiples = false;

		form.on('progress', function(bytesReceived, bytesExpected) {
			console.log(bytesReceived+'/'+bytesExpected);
		});

		form.parse(req, function(err, fields, file) {
			// res.writeHead(200, {'content-type': 'text/plain'});
			// res.write('received upload:\n\n');
			// res.end(util.inspect({fields: fields, file: file.upload.path}));
			validate_json(file.upload.path,function(_err,_ques){
				if(_err){
					res.send("invalid format");
				}
				else{
					var _q = new Questionnaire({"title":fields.title,"questions":_ques});
					_q.save(function(err,doc){
						if(err){
							res.send(err);
						}
						else{
							res.status(201).send("saved "+fields.title+" with id "+doc.id);
						}
					});
				}
			});
		});
	},
	upload_form:function(req,res){
		res.writeHead(200, {'content-type': 'text/html'});
		res.end(
			'<form action="/questionnaire/upload" enctype="multipart/form-data" method="post">'+
			'<input type="text" name="title"><br>'+
			'<input type="file" name="upload" multiple="multiple"><br>'+
			'<input type="submit" value="Upload">'+
			'</form>'
			);
	}
}
function validate_json(file_path,callback){
	fs.readFile(file_path, 'utf8', function (err, data) {
		if (err) throw err;
		var _ques = JSON.parse(data);
		var err= false;
		for(var que in _ques){
			var keys = Object.keys(_ques[que])
			// console.log(keys);
			if(keys.indexOf("que")>=0 && keys.indexOf("ans")>=0){
				// console.log("good to go");
			}
			else{
				// console.log("wrong input");
				err=true;
			}
		}
		callback(err,_ques);
	});
}


module.exports = questionnaire;