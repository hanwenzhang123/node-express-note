query string goes to the end of url starts with ?, seperate with additional value with &
/cards/4?key=value&key2=value

/cards/4?side=question
/cards/4?side=answer

req.query.side

Now we can check questions and answers by using query strings


//card.pug
extends layout.pug

block content
  section#content
    h2= text    //changed here to text to make sure the text shows up
    if hint
      p
        i Hint: #{hint}
    a(href=`${id}?side=${sideToShow}`)= sideToShowDisplay


//cards.js
const express = require('express');
const router = express.Router();
const { data } = require('../data/flashcardData.json');
const { cards } = data;

router.get( '/', ( req, res ) => {
  const numberOfCards = cards.length;
  const flashcardId = Math.floor( Math.random() * numberOfCards );
  res.redirect( `/cards/${flashcardId}?side=question` )
});

router.get('/:id', (req, res) => {
    const { side } = req.query;
    const { id } = req.params;
    const text = cards[id][side];
    const { hint } = cards[id];
    
    const templateData = { id, text };

    if ( side === 'question' ) {
      templateData.hint = hint;
      templateData.sideToShow = 'answer';
      templateData.sideToShowDisplay = 'Answer';
    } else if ( side === 'answer' ) {
      templateData.sideToShow = 'question';
      templateData.sideToShowDisplay = 'Question';
    }

    res.render('card', templateData);
});

module.exports = router;


   
//questions
What way besides a route parameter can information be passed to the server?
query string

What does a query string contain?
key value pairs

What symbol in a URL marks the beginning of a query string?
?

Given the URL
http://example.com/resource?building=42&age=40&color=salmon
What is the value of "age" in the query string?
40

Pug templates support JavaScript string interpolation.

Pug 
h1 Hi #{animal}!
h1=`Hi ${animal}!`
HTML
<h1>Hi, aardvark!</h1>
<h1>Hi, aardvark!</h1>

Pug 
h1(title='Hi ' + animal + '!') text
h1(title=`Hi ${animal}!`) text
HTML
<h1 title="Hi arrdvark!">text</h1>
<h1 title="Hi arrdvark!">text</h1>


  
