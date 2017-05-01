import ActionTypes from './ActionTypes';

var Constants = {
    API: {
        [ActionTypes.GET_QUESTION_CATEGORIES]: 'http://localhost:3000/categories',
        [ActionTypes.GET_QUESTIONS]: 'http://localhost:3000/questions',
        [ActionTypes.REGISTER_USER]: 'http://localhost:3000/signup',
        [ActionTypes.LOGIN_USER]: 'http://localhost:3000/login'
    }
};

module.exports = Constants;