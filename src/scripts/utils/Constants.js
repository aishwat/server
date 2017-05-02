import ActionTypes from './ActionTypes';

var Constants = {
    API: {
        [ActionTypes.GET_QUESTION_CATEGORIES]: 'http://ec2-35-154-248-81.ap-south-1.compute.amazonaws.com/categories',
        [ActionTypes.GET_QUESTIONS]: 'http://ec2-35-154-248-81.ap-south-1.compute.amazonaws.com/questions',
        [ActionTypes.REGISTER_USER]: 'http://ec2-35-154-248-81.ap-south-1.compute.amazonaws.com/signup',
        [ActionTypes.LOGIN_USER]: 'http://ec2-35-154-248-81.ap-south-1.compute.amazonaws.com/login'
    }
};

module.exports = Constants;