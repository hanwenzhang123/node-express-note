When you type a URL into a browser, it makes a request to the server at the URL you typed in. Routes like URLs

//install
npm install express --save 


//example at app.js
const express = require('express');

const app = express();
 // slash as the first parameter indicate the site's root, it is also called the location parameter
app.get('/', (request, response) => {      //second parameter of the get method is anonymous callback function with a request object and a response object
    response.send('I love Treehouse!');    //this call back will run when the client requests this route
});     //send method sends straight to the client

app.listen(3000); //port/server 3000, // example of using variable/constant to access module feature


//install nodemon
npm install -g nodemon //restart the server everytime when you change the code
sudo npm install -g nodemon //It will prompt you for your system password to actually execute.


//questions
The `get` method takes two parameters ____ and ___.
path, callback

The `app.listen` method can take a parameter, which will tell the server:
which port to serve the application on

In express, the convention for creating a new application, is to assign it to the variable _______: (e.g. const ___ = express();)
app

The `get` method registers a route that will listen for HTTP ____ requests at a given route.
GET

A route is where a server is set up to respond to a _____ from a client.
request


  
