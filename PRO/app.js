const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');

// CORS configuration
const CORS = require('./services/CORS');

// Loading routes.
const auth = require('./routes/auth');
const users = require('./routes/users');
const exchanges = require('./routes/exchanges');

var app = express();
app.use(cors(CORS));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan('tiny'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// EB api routes.
app.use(`${process.env.APP_MAIN}auth`, auth);
app.use(`${process.env.APP_MAIN}users`, users);
app.use(`${process.env.APP_MAIN}exchanges`, exchanges);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({error: `${err.message} ${err.status}`});
});

module.exports = app;
