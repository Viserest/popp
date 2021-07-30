const express = require('express');
const app = express();
const fs = require('fs');
const crypto = require('crypto');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(bodyParser().json());
app.use(bodyParser().urlencode({extend: true}));

function collection(name) {
  return fs.readFile(name + '.json', function(err, data) {
    return JSON.parse(data);
  });
}

app.use(function(req, res, next) {
  var json = fs.readFile('users.json', function(err, data) {
    return JSON.parse(data);
  });
  for (u of json) {
    if (u.auth == req.cookies.auth) {
      next();
    }
  }
  next();
});

// Home page
app.get('/', function(req, res) {
  
  var user = verify_auth(auth);
  res.render('template/home', {
    title: 'Popp',
    file: '../pages/home',
    img: user.image
  });
});

// Signin page
app.get('/signin', function(req, res) {
  
  var user = verify_auth(auth);
  res.render('template/home', {
    title: 'Popp: Signin',
    file: '../pages/home',
    img: user.image
  });
});

// Signup page
app.get('/signup', function(req, res) {
  
  res.sendFile(__dirname + '/public/signup.html');
});

// Profile page
app.get('/profile', function(req, res) {
  
  var user, status = verify_auth(req.cookies.auth);
  if (user == false) {
    res.render('home', {});
  } else {
    res.render('home', {});
  }

// API requests page
app.post('/api/requests', function(req, res) {
  
  var request = req.query.r;
  var auth = req.cookies.auth;
});

// API accounts page
app.post('/api/accounts', function(req, res) {
  
  var request = req.query.r;
  var auth = req.cookies.auth;
});
