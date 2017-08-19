var express = require('express');
var router = express.Router();
var _ = require('lodash');
var axios = require('axios');
var selectOptions = require('../middleware/ticket-select');
var sdk = require('../sdk/');


// var optionsUrl = 'http://pinion.api.ekhanei.com/v1/config/category'

router.get('/',selectOptions, function(req, res, next) {

	sdk.rtc.getCategory()
		.then(function (response){
			console.log('===final===')
		})
		.catch(function (err){
			console.log('==errr');
			next(err)
		})
	
	res.locals.Tonic.loggedIn = true; // Temp need to remove

    var types = _.map(req.selectOptions, function(type){
    	return {
    		id: type.id,
    		name: type.name
    	};
    })
    
	res.render('ticket/ticket', { 
  		title: 'Ticket',
  		scripts: ['/js/ticket.js'],
  		types: types
 	});  	
});

router.use('/selectCats',selectOptions, function(req, res, next) {



	








	var selectOpts = req.selectOptions;
	var finalData = [];

    if(typeof req.query.type !== 'undefined') {
    	var type = parseInt(req.query.type, 10)
    	var categoryFromType = selectOpts.filter(function(catObject) {
		    return catObject.id === type;
		})
		var categories = _.map (categoryFromType, function (category) {
			return category.categories.data;
		})
		categories = _.without(_.flatten(categories));
		finalData = [{
			optionName : 'Category',
			options: categories,
			nextItem: "subcategory"
		}]
    }

    if(typeof req.query.category !== 'undefined') {
    	var category = parseInt(req.query.category, 10);

    	var subCategoryFromType = categories.filter(function(subCatObject) {
		    return subCatObject.id === category;
		});


		var subCategories = _.map (subCategoryFromType, function (subCategory) {
			return subCategory.subcategories.data;
		})

		subCategories = _.without(_.flatten(subCategories));

		finalData = [{
			optionName : 'Reason',
			options: subCategories,
			nextItem: ''
		}]
    }

	res.render('partials/ticket/select-category', {
		layout: false, 
		categories: categories,
		catOptions: finalData
	});
});

router.post('/', function (req, res, next){
	console.log(req.body)
})

module.exports = router;
