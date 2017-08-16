var filerev = require('../lib/helpers/filerev');

module.exports = {
  json: function(context) {
    return JSON.stringify(context);
  },
  filerev: function(filepath) {
    return filerev.parse(filepath);
  },
  math: function (lvalue, operator, rvalue, options){ // {{math @index "+" "-0.5"}}
  	lvalue = parseFloat(lvalue);
    rvalue = parseFloat(rvalue);
        
    return {
        "+": lvalue + rvalue,
        "-": lvalue - rvalue,
        "*": lvalue * rvalue,
        "/": lvalue / rvalue,
        "%": lvalue % rvalue
    }[operator];
  },
  compare: function (lvalue, rvalue, options){ // {{#compare unicorns ponies operator="<"}} To do {{/compare}}
    if (arguments.length < 3){
      throw new Error("Handlerbars Helper 'compare' needs 2 parameters");
    }
    var operator = options.hash.operator;
    var operators = {
    	'==':       function(l,r) { return l == r; },
        '===':      function(l,r) { return l === r; },
        '!=':       function(l,r) { return l != r; },
		'<':        function(l,r) { return l < r; },
		'>':        function(l,r) { return l > r; },
		'<=':       function(l,r) { return l <= r; },
		'>=':       function(l,r) { return l >= r; },
		'typeof':   function(l,r) { return typeof l == r; }
    };
    if (!operators[operator]){
      throw new Error("Handlerbars Helper 'compare' doesn't know the operator "+operator);
    }
    var result = operators[operator](lvalue,rvalue);
    if( result ) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  }
};
