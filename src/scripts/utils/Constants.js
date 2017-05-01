import ActionTypes from './ActionTypes';

var Constants = {
    API: {
        [ActionTypes.GET_QUESTION_CATEGORIES]: 'http://localhost:3000/categories',
        [ActionTypes.GET_QUESTIONS]: 'http://localhost:3000/questions'
    }
};

module.exports = Constants;