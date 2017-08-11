var filerev = require('../lib/helpers/filerev');

module.exports = {
  json: function(context) {
    return JSON.stringify(context);
  },
  filerev: function(filepath) {
    return filerev.parse(filepath);
  }
};
