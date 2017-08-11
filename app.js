var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var exphbs = require('express-handlebars');
var hbsHelpers = require('./config/hbs-helpers');

var app = express();
app.locals.ENV = process.env.NODE_ENV;
app.locals.ENV_DEVELOPMENT = app.locals.ENV == 'development';
// view engine setup
// View engine setup
app.engine('.hbs', exphbs({
  defaultLayout: 'layout',
  partialsDir: ['views/partials/'],
  extname: '.hbs',
  helpers: hbsHelpers
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, (app.locals.ENV_DEVELOPMENT ? 'public' : 'dist'))));

app.use(function (req, res, next) {
  res.locals.Tonic = {
    loggedIn: (req.user) ? true : false,
  };
  next();
});

// Routes
require("./lib/route-handlers")(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
