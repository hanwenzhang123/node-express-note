// cards.js

const express = require('express');
const router = express.Router();
const { data } = require('../data/flashcardData.json'); // data = require('../data/flashcardData.json').data
const { cards } = data; // cards = data.cards;

router.get('/:id', (req, res) => {  // treat this portion as parameter id using /:id here
    res.render('card', {    // id called as the url above
        prompt: cards[req.params.id].question,
        hint: cards[req.params.id].hint
        
        // prompt: cards[0].question,
        // hint: cards[0].hint
    });
});

module.exports = router;



//Questions
How do you create a router instance in a router file?
  express.Router();

How can an express app get access to a route parameter?
  From the req.params object
  
Why is it a good idea to keep routes in files separate from the main app?
  As the app grows, this will keep your code well organized

express.Router() creates an object that behaves similar to the app object.
  

If you have an app with "birds" routes declared this way:
const birds = require('./birds');
app.use('/birds', birds);

and there is the following route in the birds file:
router.get('/south-american', (req, res) => {
  ...
}

what URL would match the route above?
  /birds/south-american
