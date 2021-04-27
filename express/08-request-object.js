re.body
By default, it is undefined. 
It is populated when you use body-parsing middleware such as body-parser and multer.

body parser - it will process the incoming form submission data into a format that is easier for our program to read

//without the body parser, the code below will be undefined. 
app.post('/hello', (req, res) => {
  console.dir(req.body);    
  res.render('hello');
});

// in the console
npm install body-parser

//app.js
const bodyParsre = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));


//questions
To send data to the server, what kind of request should a client send?
  Post
What piece of middleware makes working with incoming form data easier?
  body-parser
The request object is a JavaScript bundle of data from the incoming:
  HTTP Request
What property on req contains form data once body-parser is installed?
  body
By default, the body property does not hold an object containing any form responses a client has submitted.
