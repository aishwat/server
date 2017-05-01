import Dispatcher from '../dispatcher/Dispatcher';
import ActionTypes from '../utils/ActionTypes';
import API from '../utils/API';
import Constants from '../utils/Constants';

var LandingActions = {
	toggleLogin: function(){
		Dispatcher.dispatch({
				type: ActionTypes.TOGGLE_LOGIN,
				data: null
			});
	},

	register: function(formObject){
		API.post(Constants.API[ActionTypes.REGISTER_USER], formObject, function(data){
			Dispatcher.dispatch({
				type: ActionTypes.REGISTER_USER,
				data: data
			});
		});
	},

	login: function(formObject){
		API.post(Constants.API[ActionTypes.LOGIN_USER], formObject, function(data){
			Dispatcher.dispatch({
				type: ActionTypes.LOGIN_USER,
				data: data
			});
		});
	}
};

module.exports = LandingActions;