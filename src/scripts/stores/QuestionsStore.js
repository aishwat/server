import Dispatcher from '../dispatcher/Dispatcher';
import ActionTypes from '../utils/ActionTypes';
import { EventEmitter } from 'events';
import assign from 'object-assign';

var CHANGE_EVENT = 'change';

var questions = [];

var QuestionsStore = assign({}, EventEmitter.prototype, {
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    getQuestions: function() {
    	return questions;
    }
});

Dispatcher.register(function(payload) {
    switch (payload.type) {
        case ActionTypes.GET_QUESTIONS:
            {
                questions = payload.data;
                QuestionsStore.emitChange();
            }
            break;
    };
});

module.exports = QuestionsStore;
