  var createError = require('http-errors');
  var express = require('express');
  var path = require('path');
  var cookieParser = require('cookie-parser');
  var logger = require('morgan');
  const cors = require('cors');
  require('dotenv').config();


  var app = express(); 

  app.use(cors());  

  app.use('/uploads', express.static('public/images'));
  
  var indexRouter = require('./routes/index');
  var usersRouter = require('./routes/users');
  var codeRouter = require('./routes/code');
  var languageRouter = require('./routes/language');
  var vivaRouter = require('./routes/vivaQuestion');
  var interviewRouter = require('./routes/interviewQestion');
  var adminRouter = require('./routes/admin');
  var courseRouter = require('./routes/courses');
  const langdetail = require("./routes/langdetail");
  var categoryRouter = require('./routes/category');


  const mongoose = require('mongoose');

  mongoose.connect('mongodb+srv://kirangohil652:c3LEmB5NuxjyIszO@langbook.zeqvfp2.mongodb.net/LangBook')
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.log(error.message));

  // View engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');

  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));

  // Routes
  app.use('/', indexRouter);
  app.use('/users', usersRouter);
  app.use('/code', codeRouter);
  app.use('/language', languageRouter);
  app.use('/vivaQuestion', vivaRouter);
  app.use('/Interview', interviewRouter);
  app.use('/admin', adminRouter);
  app.use('/courses', courseRouter);
  app.use('/langdetail',langdetail);
  app.use('/category', categoryRouter);

  // Catch 404 and forward to error handler
  app.use(function(req, res, next) {
    next(createError(404));
  });

  // Error handler
  app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
  });

  module.exports = app;
