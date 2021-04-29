// get a random quote

// Send a GET request to /quotes/quote/random to READ (view) a random quote
router.get('/quotes/quote/random', asyncHandler(async(req,res,next) =>{
    const quote = await records.getRandomQuote();
    res.json(quote);
}));


//original try catch function
router.get('/quotes/quote/random', async(req,res,next) =>{
    try {
      const quote = await records.getRandomQuote();
      res.json(quote);
    } catch(err) {
      next(err);
    }
});   



//questions
Describe what the following Express route is mostly likely to do:

router.post('/products', async(req, res, next)=>{
   //...stuff happens in here 
});
  create a new product from a database

What method on the response object sends response data as JSON?
  res.json()

What might a PUT request to the /cars/2345 endpoint do?
  update data in a datastore for a car with an ID of 2345

Which endpoint retrieves a specific item in a grocery list?
  /api/groceries/332343

Which of the following is an example of Express error handling middleware?
  app.use((err, req, res, next) => { ...});

How is an error handling middleware function different than a regular middleware function?
  The function has four parameters, and the first parameter represents the error object




     
