npm install cookie-parser save

const cookieParser = require('cookie-parser');

app.use(cookieParser());

app.get('/hello', (req, res) => {
  res.render('hello', {name: req.cookies.username});
});

app.post('/hello', (req, res) => {
  res.cookie('username', req.body.username);    //save the cookie
  res.render('hello', {name: req.body.username);
});
  
  
//question
What do cookies do?
  Cookie store data on the client
  
How can express set a cookie on the client?
  res.cookie()

What is true of "stateless" interactions between servers and clients?
  Server don't remember what client made requests and what was requested

Express requires the cookie-parser middleware to be installed before it can read cookies coming in from the client

