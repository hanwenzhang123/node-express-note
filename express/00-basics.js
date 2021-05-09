//CONSOLE
mkdir myapp
cd myapp
touch server.js //entry point: (server.js)

npm init    //json set up
npm install express --save    //it adds express into your json under dependencies


//IDE
const express = require('express');
const app = express()

app.get('/', function(req, res){   //a home page, route'/', localhost:3000
  res.send('<h1>Hello, world</h1>');   // response is what the server response to, now you can see 'Hello, world' in browser
})    

app.get('/contact', function(req, res){   //we can create as many routes as we want, localhost:3000/contact
  res.send('Contact me');  
})  

app.listen(3000, function() => {
  console.log('Server started on port 3000');
});


   
