cookie - session management, personalization (remember data), tracking



const express = require('express');
const app = express();

app.get('/greet', function(req, res){ 
    res.send("Hello, world");  
});  

app.get('/setname', function(req, res){ 
    res.cookie('name', 'stevie chicks');        //sending the cookie. now in the cookie of the browser for localhost 3000, we have the data name is stevie chicks in the cookie
    res.send("sending chickcen");  
});  

app.listen(3000, ()=>{
    console.log('Serving app on localhost:3000')
})

