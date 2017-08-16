var _ = require('lodash');
var axios = require('axios');

var optionsUrl = 'http://pinion.api.ekhanei.com/v1/config/category'

module.exports = function (req, res, next) {
    axios.get(optionsUrl)
        .then(function (response) {
          req.selectOptions = response.data.data;
          next();
        })
        .catch(function (error) {
          console.log(error);
          next();
      });
};