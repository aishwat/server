var express = require('express');
var router = express.Router();
var users = require('./users.js');
var auth = require('./auth.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/auth/generate', auth.generate);
// router.post('/auth/refresh', users.update);
router.get('/validate', auth.validate);

router.post('/user/update/:id', users.update);
router.put('/user/save', users.save);
router.get('/user/list', users.list);
router.get('/user/:id', users.getById);
router.delete('/user/:id', users.deleteById);


module.exports = router;
