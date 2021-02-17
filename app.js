var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var multer = require('multer');

var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
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
//app.use('/users', usersRouter);
//app.use('/product', productRouter);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, './public/upload/temp/pic')
  },
  filename: (req, file, cb) => {
      cb(null, file.originalname )}})

const upload = multer({ storage: storage })



app.post('/upload',upload.single('fileupload'),(req,res) => {
  //res.render(req.file);
 //res.send("OK");
  res.redirect("/admin");
  //res.status(200);
})

app.post('/uploaduser',upload.single('fileuploadUser'),(req,res) => {
  //res.render(req.file);
 //res.send("OK");
  res.redirect("/user");
  //res.status(200);
})


app.post('/uploadnew',upload.single('fileuploadNew'),(req,res) => {
  //res.render(req.file);
 // res.send("OK");
  res.redirect("/admin");
  //res.status(200);
})

app.post('/uploadNewUser',upload.single('fileuploadNew'),(req,res) => {
  //res.render(req.file);
 // res.send("OK");
  res.redirect("/user");
  //res.status(200);
})

















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

app.get("/history", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/HistoryDel.html"));
});

app.get("/useredit", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/EditUserUser.html"));
});

app.get("/adminedit", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/EditUserAdmin.html"));
});

app.get("/shopedit", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/Shopedit.html"));
});

app.get("/homeadmin", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/homeadmin.html"));
});

app.get("/loghistory", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/loghistory.html"));
});

app.get("/css", (req, res) => {
  res.sendFile(path.join(__dirname + "/css/bootstrap.min.css"));
});




app.use(express.static(__dirname + '/css'));


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

