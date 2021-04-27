//app.js
app.get('/hello', (req, res) => {
    res.render('hello');
});

app.post('/hello', (req, res) => {  // in the hello.pug, we have the method as post, so we need one here
    res.render('hello');
});

//hello.pug
extends layout

block content
  h2 Welcome, student!
  form(action='/hello', method='post')    //action is where the form sends to
    label Please enter you name:
      input(type='text', name='username') //name makes sure the app can read the form submission
    button(type='submit') Submit
    
     
