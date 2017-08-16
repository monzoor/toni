/**
 * @file Manages communication with the API
 * @author Richard Francis <richard.francis@sntc.no>
 */

// var request = require('request');
var _ = require('lodash');
// var deferred = require('deferred');
// var SDKError = require('./SDKError');
// var config = require('./config');

exports.request = function (params) {
  // use 'when'?
  // var def = deferred();
  var requestTimeout = process.env.SDK_TIMEOUT || 10000;
  params = _.merge({
    method: 'GET',
    path: '/',
    data: null,
    formData: {
      image: null,
      source: null
    },
    options: {
      json: true,
      timeout: parseInt(requestTimeout, 10)
    }
  }, params);

  // Construct request options
  var options = _.merge({
    url: config.getBaseURL(params.service) + params.path,
    method: params.method,
  }, params.options);

  // If this is POST or PATCH then send data in body as json
  if (_.indexOf(['POST', 'PATCH'], params.method) !== -1) {
    if (params.formData.image !== null) {
      options.formData = params.formData;
    }
    else if (params.data !== null) {

      options.body = {
        data: params.data
      };
    }
  }

  // If this is not a POST or PATCH then send any data
  // supplied as a query string
  else if (params.data !== null) {
    options.qs = params.data;
  }

  request(options, function (err, response, body) {

    if (err) {
      // If request timed out
      if (err.code === 'ETIMEDOUT') {
        return def.reject(new SDKError("API request timeout on "+params.service));
      }

      return def.reject(
        new SDKError("API Error on "+params.service+": "+JSON.stringify(err))
      );
    }

    // Server error
    if (response.statusCode >= 500) {
      return def.reject(
        new SDKError('API Error on '+params.service+': Server returned ' + response.statusCode + ' (' + response.statusMessage + ') ' + JSON.stringify(response.body))
      );
    }

    // Return response
    def.resolve({
      code: response.statusCode,
      headers: response.headers,
      body: body
    });
  });

  // Return the promise
  return def.promise;
};
