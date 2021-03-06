// structure the rest api
seperate two files
//routes.js
const express = require('express');
const router = express.Router();   //change every app. in the file to router. like router.post
const records = require('./records');
module.exports = router   //needs to export the file at the end

//app.js
const routes = require('./routes')  //require the routes.js file
app.use('/api', routes);    
//only use the routes.js file when the request starts with '/api', need that /




//full file
//app.js
const express = require('express');
const app = express();
const routes = require('./routes');

app.use(express.json());
app.use('/api', routes);

app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    });
});

app.listen(3000, () => console.log('Quote API listening on port 3000!'));


const express = require('express');
const router = express.Router();

const records = require('./records');

function asyncHandler(cb){
    return async (req,res, next) => {
        try {
            await cb(req, res, next);
        } catch(err) {
            next(err);
        }
    }
}

// Send a GET request to /quotes to READ a list of quotes
router.get('/quotes', asyncHandler(async (req, res)=>{
    const quotes = await records.getQuotes();
    res.json(quotes);
}));

// Send a GET request to /quotes/:id to READ(view) a quote
router.get('/quotes/:id', asyncHandler(async (req, res)=>{
    const quote = await records.getQuote(req.params.id);

    if(quote){
        res.json(quote);
    } else {
        res.status(404).json({message: "Quote not found."});
    }
}));

// Send a GET request to /quotes/quote/random to READ (view) a random quote
router.get('/quotes/quote/random', asyncHandler(async(req,res,next) =>{
    const quote = await records.getRandomQuote();
    res.json(quote);
}));

//Send a POST request to /quotes to  CREATE a new quote 
router.post('/quotes', asyncHandler( async (req, res)=>{
    if(req.body.author && req.body.quote){
        const quote = await records.createQuote({
            quote: req.body.quote,
            author: req.body.author
        });
        res.status(201).json(quote);
    } else {
        res.status(400).json({message: "Quote and author required."});
    }
}));

// Send a PUT request to /quotes/:id to UPDATE (edit) a quote
router.put('/quotes/:id', asyncHandler(async(req,res) => {
    const quote = await records.getQuote(req.params.id);
    if(quote){
        quote.quote = req.body.quote;
        quote.author = req.body.author;

        await records.updateQuote(quote);
        res.status(204).end();
    } else {
        res.status(404).json({message: "Quote Not Found"});
    }
}));

// Send a DELETE request to /quotes/:id DELETE a quote 
router.delete("/quotes/:id", asyncHandler(async(req,res, next) => {
    const quote = await records.getQuote(req.params.id);
    await records.deleteQuote(quote);
    res.status(204).end();
}));



module.exports = router; 
