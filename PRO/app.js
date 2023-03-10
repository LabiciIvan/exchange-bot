const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');

let usersRouter = require('./routes/users');
let exchangesRouter = require('./routes/exchanges');


var app = express();

const corsOptions = {
  origin: 'http://localhost:5500',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-type', 'Accept','trusted'],
  credentials: true,
};

app.use(cors(corsOptions));


app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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
