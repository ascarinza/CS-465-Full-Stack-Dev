require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport');
var handlebars = require('hbs');

var indexRouter = require('./app_server/routes/index');
var usersRouter = require('./app_server/routes/users');
var travelRouter = require('./app_server/routes/travel');
var roomsRouter = require('./app_server/routes/rooms');
var apiRouter = require('./app_api/routes/index');

const cors = require('cors');

require('./app_api/models/db');

require('./app_api/config/passport');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server/views'));
app.set('view engine', 'hbs');
handlebars.registerPartials(__dirname + '/app_server/views/partials');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

// CORS
//app.use('/api', (req, res, next) => {
  //res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  //res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // Corrected 'Acess' to 'Access'
  //res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // Allow specific methods
  //next();
//});
var corsOptions = {
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
};

//Enable CORS
app.use(cors(corsOptions));

// Tests for app.use router functions
console.log('indexRouter:', typeof indexRouter);
console.log('usersRouter:', typeof usersRouter);
console.log('travelRouter:', typeof travelRouter);
console.log('roomsRouter: ', typeof roomsRouter);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/travel', travelRouter);
app.use('/rooms', roomsRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// catch 401 for unathorized error
app.use((err, req, res, next) => {
  if (err.name == 'UnauthorizedError') {
    res 
      .status(401)
      .json({"message": err.name + ": " + err.message})
  }
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
