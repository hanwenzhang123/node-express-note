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
    var =
});  

app.listen(3000, function(){
    console.log("Server is running on port 3000");
})
```


JSON - Mailchimp Server as example
```JavaScript
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');

const app = express();

app.use(express.static('public')); 
app.use(bodyParser.urlencoded({extended: true}));  

app.get('/', function(req, res){ 
    res.sendFile(__dirname + "/signup.html");  
});  

app.post('/', function(req, res){   
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: 'Subscribed',
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]

    }

    const jsonData = JSON.stringify(data); 

    const url = 'httos://us1.api.mailchimp.com/3.0/lists/0b188d00bd';

    const option ={
        method:'POST',
        auth:'hanwen:0e2a391436c5c4d53b3fe86d2ca0d979-us1'
    }

    const request = https.request(url, options, function(response){
        response.on('data', function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end()
});  

app.listen(3000, function(){
    console.log("Server is running on port 3000");
})
```
