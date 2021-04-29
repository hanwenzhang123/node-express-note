// Send a PUT request to /quotes/:id to UPDATE (edit) a quote
app.put('/quotes/:id', async(req,res) => {      //asynchoronous function
    try {       //needs a try catch block
        const quote = await records.getQuote(req.params.id);    // pull an id then pass to the id, await for the data
        if(quote){      // if the quote exist, change the quote body
            quote.quote = req.body.quote;
            quote.author = req.body.author;

            await records.updateQuote(quote);  //parse the quote to the updated quote, need await to wait this line done then next
            res.status(204).end();      // end() tells express that this function ends
        } else {
            res.status(404).json({message: "Quote Not Found"}); // if the quote not found, return 404 error 
        }
        
    } catch(err){
        res.status(500).json({message: err.message});       //catch 500 error
    }
});


// Send a DELETE request to /quotes/:id DELETE a quote 
app.delete("/quotes/:id", async(req,res, next) => {
    try {
        const quote = await records.getQuote(req.params.id);
        await records.deleteQuote(quote);   // once we get the quote, we can use deleteQuote module, once the data done, next code
        res.status(204).end();
    } catch(err){
        res.status(500).json({ message: err.message });
    }
});


//questions
//1
Consider the following JSON object that’s been sent along with a PUT request. Using the req.body property, create a new object using the information sent from the client:

{
  "userName": “Freda”,
  "age": 62
}

app.put(‘/people’, (req,res) =>{
    updatePerson({
        "userName": req.body.userName,
        "age": req.body.age 
    });
});

//2
First use the correct Express method to set an HTTP status. Then send a code indicating that the client has sent a bad request:

res.status(400).json(data);

//3
Use the correct method to send a status of 201 back with the response.

res.status(201).json(quote);

//4
What does status code 500 mean?
  There was a server error

//5 
Assume we’ve just deleted some data in a datastore. Fill in the blank to end the request.

res.status(204).end();

      
