//try and catch err by using middleware, then we do not need to do try catch for every object in the code

function asyncHandler(cb){
  return async (req, res, next)=>{
    try {
      await cb(req,res, next);
    } catch(err){
      next(err);
    }
  };
}


//Send a POST request to /quotes to  CREATE a new quote 
app.post('/quotes', asyncHandler( async (req, res)=>{   //because we need to await inside the function, so this anonymous function needs to be async 
    if(req.body.author && req.body.quote){      // we do not need try catch in every single round now
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
app.put('/quotes/:id', asyncHandler(async(req,res) => {
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
