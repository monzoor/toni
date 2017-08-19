"use strict";
var sdk = require('../sdk');

function handleSessionExpiry(app) {
  // Intercept any forbidden errors thrown by the SDK. This
  // is most likely when users are authenticated in the
  // middleware but the Pigeon JWT has expired.
  app.use(function (err, req, res, next) {

    if (err.name === 'SDKError' && err.is(sdk.account.errors.FORBIDDEN)) {
      // Logout with Passport
      req.logout();

      // Clear all custom session data
      req.session.regenerate(function (err) {
        if (err) {
          return next(err);
        }

        // Remember the requested url so we can send the user
        // there after login
        req.session.requestedUrl = req.originalUrl;

        // Show a flash message
        req.flash('info', "You have been logged out due to a period of inactivity. Please login again to continue.");

        // Redirect to login
        return res.redirect('/login-signup');
      });
    } else {
      next(err);
    }
  });
}

function handleAllErrors(app) {

  /// error handlers
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    if (err.status && err.status === 404) {
      res.render('404', {
        title: "Page not found",
        header: {
          title: "Page not found"
        }
      });
    }
    else {

      res.render('500', {
        title: "Server error",
        header: {
          title: "Server error"
        }
      });
    }
  });
}

function handleNotFound(app) {
  // Catch 404 and forward to error handler
  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
}

module.exports = function handle(app) {
  handleNotFound(app);
  handleSessionExpiry(app);
  handleAllErrors(app);
};
