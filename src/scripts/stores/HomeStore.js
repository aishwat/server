import Dispatcher from '../dispatcher/Dispatcher';
import ActionTypes from '../utils/ActionTypes';
import { EventEmitter } from 'events';
import assign from 'object-assign';

var CHANGE_EVENT = 'change';

var model = {};

var HomeStore = assign({}, EventEmitter.prototype, {
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeChangeListener(CHANGE_EVENT, callback);
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    getModel: function(){
    	return model;
    },

    getCategories: function() {
        var categories = model.map(function(object){
        	return object.category;
        });
        return categories;
    },

    getSubCategories: function(category) {

    },

    getQuestions: function(category, subcategory) {

    }
});

Dispatcher.register(function(payload) {
    switch (payload.type) {
        case ActionTypes.GET_QUESTION_CATEGORIES:
            {
                model = payload.data;
                model.map(function(object){
                	object.isClicked = false;
                    object.subCategories.map(function(object){
                        object.isClicked = false;
                    })
                });
                HomeStore.emitChange();
            }
            break;
    };
});

module.exports = HomeStore;
