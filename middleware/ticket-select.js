var _ = require('lodash');
// var axios = require('axios');
var sdk = require('../sdk/');

module.exports = function (req, res, next) {

    sdk.rtc.getCategory()
		.then(function (response){
			req.selectOptions = response.data;
          	next();
		})
		.catch(function (err){
			console.log(err.name,':',err.message);
          	next(err);
		})
};