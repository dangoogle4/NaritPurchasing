var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//var productRouter = require('./routes/product');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
//app.use('/product', productRouter);

// app.all("*", (req, res, next) => {
//   // cookie doesn't exist redirect to login
//   if (req.cookies["CookieUser"] != null) {
//     // how to pass to the next layer ? load the routes below code etc..
//     next();
//     //  console.log(req.cookies["CookieUser"]);
//   } else {
//     res.redirect("/");
//   }
// });

app.get("/main", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/home.html"));
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/loginPage.html"));
});

app.get("/user", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/User.html"));
});

app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/Admin.html"));
});


app.get("/eiei", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/eiei.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/regisPage.html"));
});

app.get("/edituser", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/EditUser.html"));
});








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

