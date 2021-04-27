//Using Response.render is where we'll get to start putting dynamic data into the Express app!

app.get('/cards', (req, res) => {
    res.render('card', { prompt: "Who is buried in Grant's tomb?" , hint: "Think about whose tomb it is."});
});

//card.pug
doctype html
html(lang="en")
  head
    title Flash Cards
  body
    header
      h1 Flash Cards
    section#content
      h2= prompt
      if hint
        p
          i Hint: #{hint}
    footer
      p An app to help you study


//exercise
//In the root route, render the "main.pug" template.
//Pass the posts object to your template, naming it "posts".

const express = require('express');
const posts = require('./mock/posts.json');

const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/templates')

app.get('/', (req, res) => {
  res.render('main', {posts: posts});
});

app.listen(3000, () => {
  console.log("The frontend server is running on port 3000!");
});
