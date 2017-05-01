import Dispatcher from '../dispatcher/Dispatcher';
import ActionTypes from '../utils/ActionTypes';
import { EventEmitter } from 'events';
import assign from 'object-assign';

var CHANGE_EVENT = 'change';

var model = {
    showLogin: true
};

var userData = {
    email: ''
};

var LandingStore = assign({}, EventEmitter.prototype, {
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    getModel: function(){
    	return model;
    },

    getUserData: function(){
        return userData;
    }
});

Dispatcher.register(function(payload) {
    switch (payload.type) {
        case ActionTypes.TOGGLE_LOGIN:
            {
                model.showLogin = !model.showLogin;
                LandingStore.emitChange();
            }
            break;
        case ActionTypes.REGISTER_USER:{
            model.showLogin = true;
            LandingStore.emitChange();
        }
        break;
        case ActionTypes.LOGIN_USER:{
           // model.showLogin = true;
            //LandingStore.emitChange();
            userData = payload.data;
            location.href = '/#/home';
        }
    };
});

module.exports = LandingStore;
