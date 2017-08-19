
var _ = require('lodash');
var deferred = require('deferred');
var config = require('./config');
var SDKError = require('./SDKError');
var axios = require('axios');

exports.calling = function (params) {
  var def = deferred();
  var requestTimeout = process.env.SDK_TIMEOUT || config.get('requestTimeout');
  params = _.merge({
    service: 'crm_core_api',
    method: 'GET',
    url: '/',
    baseURL: null,
    data: null
  }, params);

  // Construct request options
  var options = _.merge({
    url: params.url,
    method: params.method,
    baseURL: config.getBaseURL(params.service),
  }, params.options);

  // If this is POST or PATCH then send data in body as json
  if (_.indexOf(['POST', 'PATCH'], params.method) !== -1) {
    if (params.data !== null) {

      options.data = params.data
    }
  }

  // If this is not a POST or PATCH then send any data
  // supplied as a query string
  else if (params.data !== null) {
    options.params = params.data;
  }

  axios(options)
    .then(function(response) {
      // Return response
      def.resolve({
        code: response.status,
        headers: response.headers,
        body: response.data
      });
    })
    .catch(function (error) {
      // console.log(error)

      var errObj;

      if (error.response.status >= 500) {

        errObj = new SDKError('API Error on '+params.service+': Server returned ' + error.response.status + ' (' + error.response.statusText + ') ' + JSON.stringify(error.response.config),error.response.status);
        def.resolve(errObj);
        return
      }
      else {
        errObj = new SDKError("API Error on "+params.service+": "+JSON.stringify(error.response.status),error.response.status)
        def.resolve(errObj);
        return
      }
    });

  // Return the promise
  return def.promise;
};
