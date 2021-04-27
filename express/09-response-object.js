require object looks the response that the client has made
response object shift the response back to the client

//app.py
app.get('/hello', (req, res) => {
  res.render('hello');
});

app.post('/hello', (req, res) => {
  res.render('hello', { name: req.body.username });
});

//hello.pug
extends layout

block content
  if name
    h2 Welcome, #{name}!
  else 
    form(action='/hello', method='post')
      label Please enter you name:
        input(type='text', name='username')
      button(type='submit') Submit
      
      
//question
 The request object gives us access to data the client has sent to the server, such as values of fields from a form submission.
 The response object is focused on what data the app wants to send back, not what data the app has received.
 
 The response object’s _____ method is used to turn templates into HTML.
 render

What is the response object for?
  packaging a response to be sent back to the client
  
What is a good way to send only data to the client?
  JSON
  
The response object’s `send` method can be used to send a string or JSON.



//exercise
//Add a new route at the "/blog" url. The callback function should take req and res as parameters. Leave the callback's body blank for now.
//Use the send method on the response object to return the posts object when the /blog route is requested.
const express = require('express');
const posts = require("./mock/posts.json");

const app = express();

app.get('/', (req, res) => {
  res.send("<h1>I Love Treehouse!</h1>");
});

app.get('/blog', (req, res) => {
  res.send(posts);
});

app.listen(3000, () => {
  console.log("The frontend server is running on port 3000!")
});

