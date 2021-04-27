Make the app more maintainable by moving the routes into their own file.

//app.js
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());

app.set('view engine', 'pug');

const mainRoutes = require('./routes')  //request the router file, because we have index.js so we do not need to refer it here
const cardRoutes = require('./routes/cards')  

app.use(mainRoutes);  //make the middleware now, pass routes where all the routes are 
app.use('/cards', cardRoutes);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status);
  res.render('error');
});

app.listen(3000, () => {
    console.log('The application is running on localhost:3000!')
});



//cards.js

const express = require('express');
const router = express.Router();    //like a mini app in express

router.get('/', (req, res) => { //every route in this file will start with the card so we can just leave the '/'
    res.render('card', { prompt: "Who is buried in Grant's tomb?" });
});     

module.exports = router;



//index.js
const express = require('express');
const router = express.Router();    //like a mini app in express

router.get('/', (req, res) => {
    const name = req.cookies.username;
    if (name) {
      res.render('index', { name });
    } else {
      res.redirect('/hello');
    }
});

router.get('/cards', (req, res) => {
    res.render('card', { prompt: "Who is buried in Grant's tomb?" });
});

router.get('/hello', (req, res) => {
  const name = req.cookies.username;
  if (name) {
    res.redirect('/');
  } else {
    res.render('hello');
  }
});

router.post('/hello', (req, res) => {
  res.cookie('username', req.body.username);
  res.redirect('/');
});

router.post('/goodbye', (req, res) => {
  res.clearCookie('username');
  res.redirect('/hello');
});

module.exports = router;  //export this router so you can reference to the app.js



