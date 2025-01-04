var createError = require('http-errors');
var express = require('express');
var db=require('./config/connection')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs =require('express-handlebars')
var UserRouter = require('./routes/user');
var AdminRouter = require('./routes/admin');
var session=require('express-session')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs',hbs.engine({extname:'hbs',defaultLayout:'layout',layoutsDir:__dirname+'/views/layout/',partialsDir:__dirname+'/views/partials/'}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'src')));
app.use(session({
  secret: "ecomee",
  saveUninitialized:false,
  resave:false,
  cookie: {
    maxAge:6000*60,
  }
}))
db.connect((err)=>{
  if(err)console.log('database connection error'+err)
  else console.log('database connection succesful')  
  })

app.use('/', UserRouter);
app.use('/admin', AdminRouter);

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
  res.render('error');
});

module.exports = app;
