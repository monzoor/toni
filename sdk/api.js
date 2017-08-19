
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
      console.log('========')
      // Return response
      def.resolve({
        code: response.status,
        headers: response.headers,
        body: response.data
      });
    })
    .catch(function (error) {
      console.log(error.response.status)
      // if (error.response.status >= 500) {
      //   return def.reject(
      //     new SDKError('API Error on '+params.service+': Server returned ' + response.statusCode + ' (' + response.statusMessage + ') ' + JSON.stringify(response.body))
      //   );
      // }
      if (error.response) {
        console.log('===1===')
        // The request was made and the server responded with a status code 
        // that falls out of the range of 2xx 
        // console.log(error.response.data);
        // console.log(error.response.status);
        // console.log(error.response.headers);

        // if (error.response.code === 'ETIMEDOUT') {
        //   return def.reject(new SDKError("API request timeout on "+params.service));
        // }
        // console.log(new SDKError("API Error on "+params.service+": "+JSON.stringify(error.response.status)))


        // return def.reject(
        //   new SDKError("API Error on "+params.service+": "+JSON.stringify(error.response.status))
        // );
        // throw new SDKError("API Error on "+params.service+": "+JSON.stringify(error.response.status))
      } else if (error.request) {
        console.log('===2===')
        // The request was made but no response was received 
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of 
        // http.ClientRequest in node.js 
        // console.log(error.request);
      } else {
        console.log('===3===')
        // Something happened in setting up the request that triggered an Error 
        // console.log('Error', error.message);
      }
      // console.log(error.config);
    });


  // request(options, function (err, response, body) {

  //   if (err) {
  //     // If request timed out
  //     if (err.code === 'ETIMEDOUT') {
  //       return def.reject(new Error("API request timeout on "+params.service));
  //     }

  //     return def.reject(
  //       new Error("API Error on "+params.service+": "+JSON.stringify(err))
  //     );
  //   }

  //   // Server error
  //   if (response.statusCode >= 500) {
  //     return def.reject(
  //       new Error('API Error on '+params.service+': Server returned ' + response.statusCode + ' (' + response.statusMessage + ') ' + JSON.stringify(response.body))
  //     );
  //   }

  //   // Return response
  //   def.resolve({
  //     code: response.statusCode,
  //     headers: response.headers,
  //     body: body
  //   });
  // });

  // Return the promise
  console.log('=====44444===',def.promise)
  return def.promise;
};
