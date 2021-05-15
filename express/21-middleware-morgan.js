Middleware functtions are functions that have acceess to the request object, the response object, and the next middleware function in the application's request-response cycle.
The next middleeewarre function is commonly denoed by a named next.

request -> middleware -> response
middleware are functions that run during the req/res lifecycle
like parsing the body  

middleware is a third parameter passed in the function usualy called next


const express = require('express');
const app = express();
const morgan = require('morgan');

//app.use is executed for every single request
//app.use(express.json());  parse the json body on every request 
//app.use(express.urlencoded());  every request use this specific function, urlencoded() returns a function

app.use(morgan('common'));    //it works whatever come to next

app.use((req, res, next) => {    //without the next(), everything stops here
    console.log("THIS IS MY FIRST MIDDLEWARRE!!!")    //1
    next();
    console.log("THIS IS MY FIRST - AFTER CALLING NEXT() MIDDLEWARRE!!!")   //3
})

app.use((req, res, next) => {
    console.log("THIS IS MY SECOND MIDDLEWARRE!!!")   //2
    next();
})
  

//https://github.com/expressjs/morgan
//HTTP request logger middleware for node.js  (incoming request)

  
