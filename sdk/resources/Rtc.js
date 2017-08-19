/**
 * @file Add resource
 * @author Mehedi Hasan <mehedi@ekhanei.com>
 */

var _ = require('lodash');
var api = require('../api');
var config = require('../config');
var SDKError = require('../SDKError');

var rtc = function () {

  var baseURL = '/api/v1/';
  // var baseURL = '/v1/config/';

  // CODE GENERATION: String to CRC16 and then DECIMAL Value
  var errors = {
    NOT_FOUND: 8602,
    EXECUTION_FAILED: 4754
  };

  var ret = {
    errors: errors,

    getCategory: function (params) {

      return api.calling({
        service: 'rtc_category',
        method: 'GET',
        url: baseURL + "types",
        // url: baseURL + "category",
      })
      .then(function (response) {
        if (response.code === 200) {
          return response.body;
        }
        else if (response.code === 404 || response.code === 422) {
          throw new SDKError("No RTC category Found", errors.NOT_FOUND);
        }
        throw new SDKError("Problem to fetch RTC category", errors.EXECUTION_FAILED);
      })
    },
  };

  return ret;
};

module.exports = rtc;
