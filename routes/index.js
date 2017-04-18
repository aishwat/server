var express = require('express');
var router = express.Router();
var users = require('./users.js');
var auth = require('./auth.js');
var email_transporter = require('./email_transporter.js');
var questionnaire = require('./questionnaire.js');
/* GET home page. */
// router.get('/', function(req, res, next) {

// });
// https://www.facebook.com/v2.8/dialog/oauth?%20client_id=1441995542511342&redirect_uri=http://localhost:3000/auth/facebook/callback&response_type=code&scope=email&auth_type=rerequest
const authors = [
{
  id: 'cory-house',
  firstName: 'Cory',
  lastName: 'House'
},
{
  id: 'scott-allen',
  firstName: 'Scott',
  lastName: 'Allen'
},
{
  id: 'dan-wahlin',
  firstName: 'Dan',
  lastName: 'Wahlin'
}
];

router.get('/',function(req,res){
	res.send(authors);
})

router.post('/signup',auth.signup);
router.get('/signup_verified',auth.signup_verified);
router.post('/login',auth.login);
router.get('/validate', auth.validate);
router.get('/refresh', auth.refresh);

router.get('/auth/facebook/callback', auth.fb_callback);

router.post('/user/update/:id', users.update);
router.put('/user/save', users.save);
router.get('/user/list', users.list);
router.get('/user/:id', users.getById);
router.delete('/user/:id', users.deleteById);

router.get('/questionnaire/upload_form',questionnaire.upload_form)
router.post('/questionnaire/upload',questionnaire.upload)
router.get('/questionnaire/list',questionnaire.list)
router.get('/questionnaire/getByTitle/:title',questionnaire.getByTitle)



module.exports = router;
