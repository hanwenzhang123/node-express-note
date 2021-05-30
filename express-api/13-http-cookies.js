cookie - session management, personalization (remember data), tracking


//response with cookie

const express = require('express');
const app = express();

app.get('/greet', function(req, res){ 
    res.send("Hello, world");  
});  

app.get('/setname', function(req, res){ 
    res.cookie('name', 'stevie chicks');        //sending the cookie. now in the cookie of the browser for localhost 3000, we have the data name is stevie chicks in the cookie
    res.cookie('animal', 'shirmp');     //we can set more than one cookie on every request
    res.send("sending chickcen");  
});  

app.listen(3000, ()=>{
    console.log('Serving app on localhost:3000')
})



//cookie parser middleware
//$ npm i cookie-parser

const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
app.use(cookieParser());        //we execute it

app.get('/greet', function(req, res){ 
    const {name = 'noname'} = req.cookies    //req.cookies.name with a default value
    res.send(`Hello, world ${name}`);       // Hello, world stevie chicks
});  

app.get('/setname', function(req, res){ 
    res.cookie('name', 'stevie chicks');        //sending the cookie. now in the cookie of the browser for localhost 3000, we have the data name is stevie chicks in the cookie
    res.send("sending chickcen");  
});  

app.listen(3000, ()=>{
    console.log('Serving app on localhost:3000')
})

  
