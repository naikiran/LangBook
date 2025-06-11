const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Basic middleware
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('public/images'));

// Import routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const codeRouter = require('./routes/code');
const languageRouter = require('./routes/language');
const vivaRouter = require('./routes/vivaQuestion');
const interviewRouter = require('./routes/interviewQestion');
const adminRouter = require('./routes/admin');
const courseRouter = require('./routes/courses');
const langdetailRouter = require('./routes/langdetail');
const categoryRouter = require('./routes/category');

// MongoDB connection
mongoose.connect('mongodb+srv://kirangohil652:c3LEmB5NuxjyIszO@langbook.zeqvfp2.mongodb.net/LangBook', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('MongoDB connection error:', error));

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/code', codeRouter);
app.use('/language', languageRouter);
app.use('/vivaQuestion', vivaRouter);
app.use('/Interview', interviewRouter);
app.use('/admin', adminRouter);
app.use('/courses', courseRouter);
app.use('/langdetail', langdetailRouter);
app.use('/category', categoryRouter);

// Error handling
app.use((req, res, next) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found'
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    status: 'error',
    message: err.message || 'Internal server error'
  });
});

module.exports = app;
