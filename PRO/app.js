let createError = require('http-errors');
let cookieParser = require('cookie-parser');
let express = require('express');
let logger = require('morgan');
let path = require('path');

let usersRouter = require('./routes/users');
let exchangesRouter = require('./routes/exchanges');
//let migrateRouter = require('./middleware/migrateBase');


var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/migrate', migrateRouter);
app.use('/users', usersRouter);
app.use('/exchanges', exchangesRouter);

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
