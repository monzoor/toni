var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('auth/login', { 
  	title: 'Login',
  	scripts: ['/js/login.js'],
  });
});

router.post('/', function (req, res, next){
	console.log(req.body)
})

module.exports = router;
