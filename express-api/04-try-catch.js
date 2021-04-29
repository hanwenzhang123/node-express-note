const express = require('express');
const app = express();

const records = required('./records');

app.use(express.json());    //we are expecting a middleware to send json post


// Send a GET request to /quotes to READ a list of quotes
app.get('/quotes', async (req, res)=>{
    const quotes = await records.getQuotes();
    res.json(quotes);
});

// Send a GET request to /quotes/:id to READ(view) a quote
app.get('/quotes/:id', async (req, res)=>{
    try {
        const quote = await records.getQuote(req.params.id);
        res.json(quote);
    } catch(err) {
        res.json({message: err.message});
    }
});


// Send a POST request to /quotes to  CREATE a new quote 
app.post('/quotes', async (req, res)=>{   //when the post request sent to the route, async lets js know there is a function to await
  try{
    const quote = await records.createQuote({   // await the info before we send it back to the client 
      quote: req.body.quote,
      author: req.body.author
  });
  res.json(quote);    //send it back as json
  }catch(err){  //if err, it will be catch here, and a message will be sent
    res.json(message: err.message);
  }
});

app.listen(3000, () => console.log('Quote API listening on port 3000!'));

