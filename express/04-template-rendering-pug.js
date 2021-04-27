template rendering
A template provides the basic HTML for your app and serves it to the users
templates also let you vary the output to provide costomized resposnes

Templates are stored on the server

Steps to Using Pug (formerly Jade)
1. download pug with npm
2. update code in app to use pug
3. create templates
4. render templates with response.render()

install pug in the console
npm install pug --save

app.set('view engine', 'pug');   //tell which template to use

//Starter Code Snippet
doctype html
html(lang="en")
  head
    title Landing Page
  body
  
  //questions
Why is template rendering so important?
  it allows developers to reuse more of their code

In Pug's syntax, which of the following is correct assignments of the class `nav` to a `div`:
  div("nav")
  div(class="nav")
  div.nav

The response object's `render` method takes the name of a template as its first parameter. The file extension (e.g. `.pug`) is not required.
  
How do you nest one element inside another in a Pug template?
  indent the nested element under the enclosing element

In order to use Pug in your app, all of the following need to be true
  The 'view engine' parameter is set to 'pug' on the app, e.g. 'app.set('view engine', 'pug')'
  The Pug node-module is installed



  // app.js
  const express = require('express');

const app = express();

app.set('view engine', 'pug');      // pug template

app.get('/', (req, res) => {    // http://localhost:3000/
    res.render('index');    // no need to specific file extension since you already made a view folder with a pug in it
});         //change to render for connecting the template

app.get('/hello', (req, res) => {   // http://localhost:3000/hello
    res.send('<h1>Hello, JavaScript Developer!</h1>');
});


app.listen(3000, () => {
    console.log('The application is running on localhost:3000!')
});


//  view/index.pug
doctype html
html(lang="en")
  head
    title Landing Page
  body
   h1 The future home of something magical! 
   p Gate wind, moonshine horses meow irrigation , with feed troughs cheep, or cabbage with pumpkin trees chicken. In the straw rain barrels. Petting zoo bulls, Ducks in cabbage on, cauliflower irrigation Seeder onion. Pick up truck livestock, pets and storage shed, troughs feed bale manure, is garden wheat oats at augers. Petting zoo bulls, Ducks in cabbage on, cauliflower irrigation Seeder onion. Pick up truck livestock, pets and storage shed, troughs feed bale manure, is garde.
