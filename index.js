const express = require('express');
const app = express();
const fs = require('fs');
const crypto = require('crypto');
const cookieParser = require('cookie-parser');

app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencode({extend: true}));

app.use((req, res, next) => {
  // DeviceID
  if (!req.cookies.device) {
    res.cookie('device', crypto.createHash('sha256').update(crypto.randomBytes(256) + Date.now()).digest('hex'));
  }
  // AuthID
  res.locals.user = JSON.parse(fs.readFileSync('users.json')).find(v => v.auth.token == req.cookies.auth && v.auth.expires > Date.now());
  
  next();
});

// Home page
app.get('/', (req, res) => {
  res.render('templates/home', {
    title: 'Popp',
    file: 'home'
  })
})

// Console page
app.get('/console', (req, res) => {
  res.render('templates/home', {
    title: 'Popp Console',
    file: 'console'
  })
})

// User home page
app.get('/user/home', (req, res) => {
  
  if (!res.locals.user) {
    res.redirect('/user/signin');
  }
  res.render('templates/home', {
    title: 'Popp Profile Home',
    file: 'profile'
  })
})

// User signup page
app.get('/user/signup', (req, res) => {
  res.render('templates/home', {
    title: 'Popp Signup',
    file: 'signup'
  })
})

// User signin page
app.get('/user/signin', (req, res) => {
  res.render('templates/home', {
    title: 'Popp Signin',
    file: 'signin'
  })
})

// API requests page
app.all('/api/requests', (req, res) => {
  
  var request = req.query.r;
})

// API console page
app.all('/api/console', (req, res) => {
  
  var request = req.query.r;
})

// API user page
app.all('/api/user', (req, res) => {
  
  var request = req.query.r;
  if (request == 'signup') {
    
    
  } else if (request == 'signin') {
    
    
  } else if (request == 'signout') {
    
    
  }
})
