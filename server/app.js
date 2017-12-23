const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const base = require('./routes/base');
const student = require('./routes/student');
const teacher = require('./routes/teacher');
const admin = require('./routes/admin');

const app = express();
app.set('view engine','ejs');
app.set('views', path.resolve(__dirname,'views'));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/student', student);
app.use('/teacher', teacher);
app.use('/base', base);
app.use('/admin', admin);

app.get("/", (req, res, next)=>{
  res.end("hello hy");
});
// 404捕捉
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// 发生错误处理
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
