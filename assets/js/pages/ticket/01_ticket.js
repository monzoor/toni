(function($) {

	var data = {},
		count = 0;

	$("#dynamic select").on('change', function (){
		var currentValue = $(this).val();
		var currentKey = $(this).attr('name');

		if(currentKey === 'type') {
			count++;
		}

		var objKey , keyValue 
		$("#dynamic select :selected").map(function(i, el) {

			objKey = $(el).parent().attr('id');
			keyValue = $(el).val();

			if (objKey === 'category' && keyValue === '' ){
				$('#subcategory').find("option:gt(0)").remove();
			}

			if (objKey === 'type' && keyValue === '' ){
				$('#subCats select').find("option:gt(0)").remove();
				data = {};
			}
			else if (typeof objKey !== 'undefined' && keyValue !== ''){
				var newData = { [objKey]: keyValue }
				data = $.extend({}, data, newData);
			}
		});
		if(count>1) {
			delete data[Object.keys(data)[1]];
			count = 0;
		}

		
		if (!jQuery.isEmptyObject(data)){
			toAppend = $('#'+$(this).find(':selected').data('next'));

			$.get('/ticket/selectCats', data)
			    .success(function(res){ //response
			    	console.log(res)
			    	toAppend.html(res);
			    })
			    .error(function(err){ 
			    	console.log('errr', err)
				});
		}
		
	})
})(window.jQuery);