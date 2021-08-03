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

app.use(function(req, res, next) {
  req.user = fs.readFile('users.json', function(err, data) {
    for (u of JSON.parse(data)) {
      if (u.auth == req.cookies.auth) {
        return u;
      }
    }
    return null;
  }
  next();
});

// Home page
app.get('/', function(req, res) {
  
  var name, image;
  if (req.user != null) {
    name = req.user.image;
    image = req.user.name;
  }
  
  res.render('template/home', {
    title: 'Popp',
    file: '../pages/home',
    name: name,
    image: image
  })
})

// Signin page
app.get('/signin', function(req, res) {
  
  res.render('template/blank', {
    title: 'Popp Signin',
    file: '../pages/signin'
  })
})

// Signup page
app.get('/signup', function(req, res) {
  
  res.render('template/blank', {
    title: 'Popp Signup',
    file: '../pages/signup'
  })
})

// Profile page
app.get('/profile', function(req, res) {
  
  if (req.user == null) {
    res.redirect('/signin?status=invalid_auth');
  }
  
  res.render('template/home', {
    title: 'Popp Profile',
    file: '../pages/profile',
    name: req.user.name,
    email: req.user.email,
    image: req.user.image
  })
})

// API requests page
app.post('/api/requests', function(req, res) {
  
  var request = req.query.r;
  var auth = req.cookies.auth;
});

// API accounts page
app.all('/api/accounts', function(req, res) {
  
  var request = req.query.r;
  if (request == 'signup') {
    
    if (req.method != 'post') {
      res.redirect('/signup?status=invalid_method');
    }
  } else if (request == 'signin') {
    
    if (req.method != 'post') {
      res.redirect('/signin?status=invalid_method');
    }
  } else if (request == 'signout') {
    
    res.clearCookie(auth);
    var auth = req.cookies.auth;
  }
});
