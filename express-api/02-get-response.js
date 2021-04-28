const express = require('express');
const app = express();

app.get('/greetings', (req, res)=>{     // get takes 2 argument, first - the route we want to handle, second - callback function how we want to respond
    res.json({'greeting': 'Hello World!'})    //json in object
});     //because we build a rest api, we want to send back json instead of res.render('some_html_template')

app.listen(3000, () => console.log('Quote API listening on port 3000!'));



//app.js
const express = require('express');
const app = express();

// Send a GET request to /quotes to READ a list of quotes
app.get('/quotes', (req, res)=>{
    res.json(data);
});
// Send a GET request to /quotes/:id to READ(view) a quote
app.get('/quotes/:id', (req, res)=>{    // :id the : is internet parameter, important
    const quote = data.quotes.find(quote => quote.id == req.params.id); //compare id to find a match
    res.json(quote);    // send the quote back to the client as json based on the id putting in 
});



//questions
Look at the code sample below. Use the correct Express method to send the response as JSON.
app.get('/messages', (req, res) => {
    res.json({message: "Welcome to my API"})
});

Data for a REST API don't have to be kept in a database.
In a production application, your data will most likely be stored in a database. But you can also store data in a file or a JavaScript object.

What might a POST request to the endpoint /flowers do?
  create one new flower

If we defined an Express route for a GET request to ‘shoes/:id’, what might the response contain?
  A specific pair of shoes from a database
A GET request is for retrieving data.

What might a PUT request to an endpoint /flowers/1222 do?
- Update a specific flower
- A PUT request indicates that data is being updated.

  
