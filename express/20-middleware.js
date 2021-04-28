(request, response, next) => {}

(req, res, next) => {}  //industry standard way writing it

app.use((req, res, next) => {}); // to run middleware, use app.use, run it for every request

app.use('/users', (req, res, next) => {});  // to run a specific route using middleware

app.get('/users', (req, res, next) => {}); //run only when a get request is made


//using next
app.use((req, res, next) => {
    req.message = 'This message made it!';
    next(); //without the next in the function, the page keeps loading, it looks for next()
});

app.use((req, res, next) => {
    console.log(req.message);
    next();
});


//handling error
app.use((req, res, next) => {
    console.log('Hello');
    const err = new Error('Holy Smokes!');
    next(err);
});

app.use((req, res, next) => {
    console.log('World');   //world is not logged because of the error
    next();
});


//middleware in context
//app.js
app.use(bodyParser.json()); //info comes in the request, third part middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  const num = parseFloat(req.body.number);
  const result = num * 2;
  req.doubled = result;
  next();
})

app.use('/', routes);

//index.js
router.get('/', (req, res, next) => {
  res.render('index');
});

router.post('/', (req, res, next) => {
  res.render('index', { doubled: req.doubled });
});


//error handling
app.use((req, res, next) => {
  if (req.body.number === undefined) {
    return next();
  }
  const num = parseFloat(req.body.number);
  if (isNaN(num)) {
    const err = new Error('Submitted value is not a number');
    return next(err);   //add return to ensure the function ends here
  }
  const result = num * 2;
  req.doubled = result;
  next();
});


//reusable, configurable



   
