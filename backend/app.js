var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var passport = require('passport');
var Strategy = require('passport-github').Strategy;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);

passport.use(new Strategy({
        // clientID: process.env.CLIENT_ID,
        clientID: '96e894aef351c46acd2e',
        // clientSecret: process.env.CLIENT_SECRET,
        clientSecret: '1b273e37c864bdb4405986955ff1e8eb89c39e49',
        callbackURL: 'http://localhost:3000/login/github/return'
    },
    function(accessToken, refreshToken, profile, cb) {
        return cb(null, profile);
    }));

passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

// Define routes.
app.get('/',
    function(req, res) {
        res.render('home', { user: req.user });

    });

app.get('/login',
    function(req, res){
        res.render('login');
    });

app.get('/login/github',
    passport.authenticate('github'));

app.get('/login/github/return',
    passport.authenticate('github', { failureRedirect: '/login' }),
    function(req, res) {
        res.redirect('/');
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
