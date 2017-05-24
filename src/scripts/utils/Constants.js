import ActionTypes from './ActionTypes';
var host = "http://localhost:3000";
// var host = "http://ec2-35-154-248-81.ap-south-1.compute.amazonaws.com";

var Constants = {
    API: {
        [ActionTypes.GET_QUESTION_CATEGORIES]: host+'/categories',
        [ActionTypes.GET_QUESTIONS]:host+ '/questions',
        [ActionTypes.REGISTER_USER]:host+'/signup',
        [ActionTypes.LOGIN_USER]: host+'/login'
    }
};

module.exports = Constants;