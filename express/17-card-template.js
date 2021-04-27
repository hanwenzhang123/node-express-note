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
    br
    a(href='/cards') Next Card  //move easily to the next card by clicking the link


//cards.js
const express = require('express');
const router = express.Router();
const { data } = require('../data/flashcardData.json');
const { cards } = data;

router.get( '/', ( req, res ) => {    //redirect users to the random cards, do not need /cards since we already here
  const numberOfCards = cards.length;
  const flashcardId = Math.floor( Math.random() * numberOfCards );
  res.redirect( `/cards/${flashcardId}?side=question` )
});

router.get('/:id', (req, res) => {
    const { side } = req.query;
    const { id } = req.params;
    const text = cards[id][side];
    const { hint } = cards[id];

    if (!side) {
      res.redirect(`/cards/${id}?side=question`);
    }
    const name = req.cookies.username;
    const text - cards[id][side];
    const { hint} = cards [id];
    
    const templateData = { id, text, name };

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



    
