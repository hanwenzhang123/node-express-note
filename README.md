# node-express-note
Terminal
```
touch app.js index.html
npm init
npm install body-parser express request
```

IDE
```JavaScript
//jshint esversion: 6

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

app.use(express.static('public')); 
app.use(bodyParser.urlencoded({extended: true}));      

app.get('/', function(req, res){ 
    res.sendFile(__dirname + "/index.html");  
});  

app.post('/', function(req, res){   
    const =
});  

app.listen(3000, function(){
    console.log("Server is running on port 3000");
})
```

EJS
```JavaScript
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static('public')); 
app.use(bodyParser.urlencoded({extended: true}));
app.set('view eengine', 'ejs');      

app.get('/', function(req, res){ 
    res.render('home');
});  

app.listen(3000, function(){
    console.log("Server is running on port 3000");
})
```
