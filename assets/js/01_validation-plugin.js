/**
 * Form validation 
 *
 */
 
(function($, validate) {
  
  $.fn.formValidation = function(options) {
    // Default options
    if (!options) options = {};
    $.extend(options, {});

    // Container
    var $container = this;

    var $fields = [];
    var _constraints = {};
    var data = {};
    

    /**
     * Init
     *
     * Initialize the component and bind events
     */
    var init = function () {
        // creating object from the options
        options.items.split(/\s*,\s*/).forEach(function(itemName) {
            // fields
            $fields[itemName] = $container.find('[name='+itemName+']');
            // type
            var inputType = $container.find('[name='+itemName+']').attr('type');

            // Validation contraints/schema depending on input type
            if (inputType === 'email') _constraints.email = {presence: true, email: true};
            if (inputType === 'password') _constraints.password = {presence: true, length: {minimum: 6}};
        });

        $container.on('submit', function (e){
            // Stop the form from submitting straight away
            e.preventDefault();

            // Gather the data
            Object.keys($fields).forEach(function (key) {
                data[key] = $container.find('[name='+key+']').val();
            })

            // Validate the form data
            var errors = validate(data, _constraints);

            // If there are validation errors
            if (errors) {
                for (var name in errors) {
                    var message = errors[name][0],
                    field = $fields[name];

                    showError(field, message);
                }
            }
            return this;
        });
    };
    
    var showError = function(field, message) {
        // Variable to hold the error <span>
        var $error = null;

        // If the field is already displaying an error then
        // just get the element
        if (field.data('error')) {
            $error = field.next('.error').eq(0);
        }

        // If the field is not displaying an error then
        // create the element and insert it into the DOM
        else {
            field.closest('.form-group').addClass('has-error')
            $error = $('<span class="error control-label">test</span>');
            $error.appendTo(field.parent());
        }

        // Display the message
        $error.html(message);

        // Mark field as having error
        field.data('error', true);

        // When this field changes, remove the validation
        // error. The user no longer needs to see the message
        // and we will revalidate on submission.
        var eventName = field.is('select') ? 'change' : 'keydown';
        var clearEvent = function() {
            clearError(field);
            field.off(eventName, clearEvent);
        };

        field.on(eventName, clearEvent);
    };

    var clearError = function(field) {
        // If this field is not displaying an error then do
        // nothing.
        if (!field.data('error')) {
            return;
        }

        // Remove the error <span>
        field.closest('.form-group').removeClass('has-error')
        field.parent().find('.error').remove();

        // Mark the field as valid
        field.data('error', false);
    };

    this.init = init;

    // Initialize component
    return this.init();

  };

})(window.jQuery, window.validate);
