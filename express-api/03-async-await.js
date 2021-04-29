const express = require('express');
const app = express();

const records = required('./records');

// Send a GET request to /quotes to READ a list of quotes
app.get('/quotes', async (req, res)=>{    //await must be used inside of the async function
    const quotes = await records.getQuotes();   //await tells js to wait until this information done before moving to the next code
    res.json(quotes);   //after awiat, js knows to wait for something returns back then move on to execute next line of code
});
// Send a GET request to /quotes/:id to READ(view) a quote
app.get('/quotes/:id', async (req, res)=>{    
    const quote = await records.getQuotes(req.params.id); //find the correct quote then move on to th next code
    res.json(quote);    // send the quote back to the client as json based on the id putting in 
});

app.listen(3000, () => console.log('Quote API listening on port 3000!'));


//questions

//1
Fill in the blank to use async/await syntax

app.get('/quotes', async (req, res) => {
  const quotes = await records.getQuotes();
  res.json(quotes);
});

//2
Consider the following code. If a GET request were sent to the endpoint /people/5555, what would be the response?

app.get('/people/:uniqueId', async (req, res) => {
  const person = await getPerson(req.params.uniqueId);
  res.json(person);
});

The person in the datastore with an ID of 5555

//3
What best describes an ORM?
  A library that provides methods that make it easier to interact with database, such methods to retrieve, update or save data
An object-relational mapper (ORM) is a code library that automates the transfer of data stored in relational database tables into objects that are more commonly used in application code.

  
