var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose')
const session = require('express-session'); 
const fileUpload = require('express-fileupload');

const MongoStore = require('connect-mongo');


var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login.routes');
var addRouter = require('./routes/add.routes')
var allRouter = require('./routes/all.pets.routes')


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());

app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 600000 // 60 * 1000 ms === 1 min
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI

      // ttl => time to live
        // ttl: 60 * 60 * 24 // 60sec * 60min * 24h => 1 day
     
    })
  })
);

app.post('/upload', (req, res) => {
  // Log the files to the console
  console.log(req.files);

  // All good
  res.sendStatus(200);
});

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/addPets', addRouter);
app.use('/allPets', allRouter);


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

mongoose
  .connect(process.env.MONGODB_URI)
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });

module.exports = app;