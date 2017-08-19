
var SDKError = function(message, code) {
  this.name = 'SDKError';

  this.message = (message || "");
  this.code = null;

  if (code === 0 || code > 0) {
    this.code = code;
  }

  this.is = function(code) {
    return (this.code === code);
  };
};

SDKError.prototype = Error.prototype;

module.exports = SDKError;