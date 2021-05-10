//CONSOLE
mkdir myapp
cd myapp
touch server.js //entry point: (server.js)

npm init    //json set up

npm install express    //it adds express into your json under dependencies, does not need '--save'


//IDE
const express = require('express');


const app = express();

/*
app.get('/', function(req, res){   //a home page, route'/', localhost:3000
  res.send('<h1>Hello, world!</h1>');   // response is what the server response to, now you can see 'Hello, world' in browser
}); 
*/

app.get('/', function(req, res){ 
    res.sendFile(__dirname + "/index.html");     
});  
 //a seperate html file called idnex.html here


app.get('/contact', function(req, res){   
  res.send('Contact me');  
});  
//we can create as many routes as we want, localhost:3000/contact


app.listen(3000, function(){
  console.log('Server started on port 3000.');
});


   
// more content format
//command-line
touch app.js index.html
npm init
npm install body-parser express request

//IDE
//jshint esversion: 6
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

app.use(express.static('public'));      //a static folder named public to store local data in order to access globally
app.use(bodyParser.urlencoded({extended: true}));       //execute body-parser

app.get('/', function(req, res){ 
    res.sendFile(__dirname + "/signup.html");  
});  

app.post('/contact', function(req, res){   
    var =
});  

app.listen(3000, function(){
    console.log("Server is running on port 3000");
})
