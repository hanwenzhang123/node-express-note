app.get('/', (req, res) => {
    const name = req.cookies.username;
    res.render('index', { name });    //{name: name}
});

app.post('/hello', (req, res) => {
  res.cookie('username', req.body.username);    //save to the cookie
  res.redirect('/');    //redirect to the home page
});


//hello.pug - no one will land this page unless the app does not know the name
extends layout

block content
    form(action='/hello', method='post')
      label Please enter you name:
        input(type='text', name='username')
      button(type='submit') Submit
      
//index.pug
extends layout.pug

block content
  section#content
    h2 Welcome, #{name}!
    
    
    
    
    
//redirect with logics (if statement)
//clear cookie and redirecting to goodbye route
    //app.js
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());

app.set('view engine', 'pug');

app.get('/', (req, res) => {    //if name, render the index
    const name = req.cookies.username;
    if (name) {
      res.render('index', { name });
    } else {
      res.redirect('/hello');
    }
});

app.get('/cards', (req, res) => {
    res.render('card', { prompt: "Who is buried in Grant's tomb?" });
});

app.get('/hello', (req, res) => {   //if name, redirect to home page
  const name = req.cookies.username;
  if (name) {
    res.redirect('/');
  } else {
    res.render('hello');
  }
});

app.post('/hello', (req, res) => {    //can not get to the hello route anymore after name entered
  res.cookie('username', req.body.username); 
  res.redirect('/');
});

app.post('/goodbye', (req, res) => {      //new post route
  res.clearCookie('username');    //clear cookie method to clear the saved one
  res.redirect('/hello');     //clicked goodbye, then redirect to the hello route
});

app.listen(3000, () => {
    console.log('The application is running on localhost:3000!')
});
    

//index.pug - create the button itself  
extends layout.pug

block content
  section#content
    h2 Welcome, #{name}!
    form(action='/goodbye', method='post')    //new goodbye route
      button(type='submit') Goodbye
    

      
      
      
//review questions
When do clients normally send cookies to a server?
  clients send cookies when sending requests to the server
      
What is an excellent way to see whether a site has set a cookie?
  by using your browser's developer tools

What is one reason for redirecting after a form submission?
  It prevents forms from being submitted more than once in quick succession

Redirects require a browser or client to make a second request.

Redirects usually do not require action from the user to follow the new URL being redirected to.
