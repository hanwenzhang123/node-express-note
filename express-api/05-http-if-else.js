// Send a GET request to /quotes/:id to READ(view) a quote
app.get('/quotes/:id', async (req, res)=>{
    try {
        const quote = await records.getQuote(req.params.id);
        if(quote){
            res.json(quote);
        } else {
            res.status(404).json({message: "Quote not found."});
        }
        
    } catch(err) {
        res.status(500).json({message: err.message});
    }
});

//Send a POST request to /quotes to  CREATE a new quote 
app.post('/quotes', async (req,res) =>{
    try {
        if(req.body.author && req.body.quote){
            const quote = await records.createQuote({
                quote: req.body.quote,
                author: req.body.author
            });
            res.status(201).json(quote);
        } else {
            res.status(400).json({message: "Quote and author required."});
        }

    } catch(err) {
        res.status(500).json({message: err.message});
    } 
});




//Questions
What do status codes in the 400 range mean?
  The request has failed

What do status codes in the 200 range mean?
  the request has succeeded

A client has sent a POST request to our REST API containing data to create a new quote in our datastore. 
What does the Express.json() middleware do?
  Tells express expect that incoming requests will be in the form of a JSON object
  Parses the incoming JSON object so that the data from the request is available on req.body

How do we catch errors when using async/await syntax?
  Use 'try...catch'

Which middleware method parses incoming JSON from the client and makes it available to our Express server via req.body?
  Express.json()
  
    
