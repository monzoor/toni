var _config = {
  baseURL: {
    'crm_core_api':           process.env.SERVICE_CRM,
    'crm_broker':             process.env.SERVICE_CRM_BROKER,
    'rtc_api':                process.env.SERVICE_RTC_API,
    'rtc_category':           process.env.SERVICE_RTC_CATEGORY,
    'rtc_recommendation':     process.env.SERVICE_RTC_RECOMMENDATION,
  },
  requestTimeout: 10000,
};


var self = module.exports = {
  getBaseURL: function(service) {
    if (!_config.baseURL.hasOwnProperty(service)) {
      throw new Error(`Base URL for service '${service}' is not set.`);
    }

    if (! _config.baseURL[service]) {
      throw new Error(`Environment variable for service '${service}' is not set.`);
    }

    return _config.baseURL[service];
  },

  get: function(key) {
    if (_config.hasOwnProperty(key)) {
      return _config[key];
    } else {
      throw new Error(`Config key '${key}' doesn't exist.`);
    }
  }
};