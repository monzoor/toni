(function($) {

	var data = {},
		count = 0;


	$("#dynamic select").on('change', function (){
		var currentValue = $(this).val();
		var currentKey = $(this).attr('name');
		var $this = $(this)

		if(currentKey === 'type') {
			count++;
		}

		var objKey , keyValue 
		$("#dynamic select :selected").map(function(i, el) {

			objKey = $(el).parent().attr('id');
			keyValue = $(el).val();

			if (objKey === 'category' && keyValue === '' ){
				$('#subcategory').find("option:gt(0)").remove();
				$("#subcategory").prop('disabled', true);
			}

			if (objKey === 'type' && keyValue === '' ){
				$('#subCats select, #subcategory').find("option:gt(0)").remove();
				$("#dynamic select:not(:first),#subcategory").prop('disabled', true);
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
		var toAppend = $('#'+$(this).find(':selected').data('next'));

		var loader = $('#loader')
		$(document).ajaxStart(function () {
			loader.show();
			toAppend.prop('disabled', true);
        });
		$(document).ajaxStop(function () {
            loader.hide();
            toAppend.prop('disabled', false);
        });
		
		if (!jQuery.isEmptyObject(data)){
			
			$.get('/ticket/selectCats', data)
			    .success(function(res){ //response
			    	toAppend.prop('disabled', false);
			    	toAppend.html(res);
			    })
			    .error(function(err){ 
			    	console.log('errr', err)
				});
		}
		
	})
})(window.jQuery);