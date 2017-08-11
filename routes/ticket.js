var express = require('express');
var router = express.Router();
var _ = require('lodash');


router.get('/', function(req, res, next) {
	
	res.locals.Tonic.loggedIn = true; // Temp need to remove

  	res.render('ticket/ticket', { 
  		title: 'Ticket',
  		// scripts: ['/js/login.js'],
 	});
});

router.post('/', function (req, res, next){
	console.log(req.body)
})

module.exports = router;
