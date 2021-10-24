# node-express-note
### Node Setup
##### Basic
```JavaScript
const express = require('express');
const app = express();

app.get('/', function(req, res){ 
    res.send("Hello, world");  
});  

app.listen(3000, ()=>{
    console.log('Server is running on port 3000')
})
```
```JavaScript
//configure express to auto pass the incoming JSON to an object so we can access it in our request
app.use(express.json()) 
```

##### Terminal
```
npm init -y
npm install nodemon --save-dev
npm install express body-parser request
```

### IDE
```JavaScript
//jshint esversion: 6

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();  //setup express

app.use(express.static('public'));  //app.use: customize our server
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){ 
    res.sendFile(__dirname + "/index.html");  
});  

app.post('/', function(req, res){   
    const =
});  

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
```

### EJS
```JavaScript
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static('public')); 
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');      

app.get('/', function(req, res){ 
    res.render('home');
});  

app.listen(3000, function(){
    console.log("Server is running on port 3000");
})
```

### Express Error Handler
```javascript
//ExpressError.js

class ExpressError extends Error { 
    constructor(message, statusCode) {
        super();
        this.message = message;
        this.statusCode = statusCode;
    }
}
module.exports = ExpressError;
```

```javascript
//catchAsync.js
module.exports = func => {
    return (req, res, next) => {
        func(req, res, next).catch(next)
    }
}
//use it to wrap our async function
```
