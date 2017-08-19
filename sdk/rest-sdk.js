// Config is a singleton
var config = require('./config');

module.exports = function () {
  return {
    config: config,
    rtc: require('./resources/Rtc')(),
  };
};