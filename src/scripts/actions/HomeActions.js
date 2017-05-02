import Dispatcher from '../dispatcher/Dispatcher';
import ActionTypes from '../utils/ActionTypes';
import API from '../utils/API';
import Constants from '../utils/Constants';

var HomeActions = {
	getQuestionCategories: function(){
		API.get(Constants.API[ActionTypes.GET_QUESTION_CATEGORIES], function(data){
			Dispatcher.dispatch({
				type: ActionTypes.GET_QUESTION_CATEGORIES,
				data: data
			});
		});
	},

	getQuestions: function(){
		API.get(Constants.API[ActionTypes.GET_QUESTIONS], function(data){
			Dispatcher.dispatch({
				type: ActionTypes.GET_QUESTIONS,
				data: data
			});
		});
	},

	viewReport: function(latestModel){
		Dispatcher.dispatch({
			type: ActionTypes.VIEW_REPORT,
			data: latestModel
		});
	}
};

module.exports = HomeActions;