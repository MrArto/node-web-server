const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();


hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');


app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.');
    }
  })
  next();
});

// 
// app.use((req, res, nest) => {
//   res.render('maintenance.hbs', {
//     pageTitle: 'maintenance Page',
//     welcomeMessage: 'Welcome to my webstie'
//   });
// });


app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('getCurrentMonth', () => {
  return new Date();
});

hbs.registerHelper('screamIT', (text) => {
  return text.toUpperCase();
});


app.get('/', (req, res) => {
res.render('home.hbs', {
  pageTitle: 'Home page',
  welcomeMessage: 'Welcome to my webstie',
});
});


app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});


//bad
app.get('/bad', (req, res) => {
  res.send({
  errorMessage: 'Unable to hendle request'
  });
});


app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
