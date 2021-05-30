https://github.com/jaredhanson/connect-flash
purpose: flash a message to the user; usually after an action then you redirect
//successful flash one time then disappear

$ npm install connect-flash


const session = require('express-session');
const flash = require('connect-flash');

const sessionOptions = { secret: 'thisisnotagoodsecret', resave: false, saveUninitialized: false }
app.use(session(sessionOptions));
app.use(flash());   //need it to execute


app.post('/farms', async (req, res) => {
    const farm = new Farm(req.body);
    await farm.save();
    req.flash('success', 'Successfully made a new farm!');  // we pass the category first, like key, then the message we flash, usually do it right before redirect
    res.redirect('/farms')
})
  
app.get('/farms', async (req, res) => {
    const farms = await Farm.find({});
    res.render('farms/index', { farms, message: req.flash('success')})    //here we retrieve the flash message after the page redirect to here by using message: req.flash('success')
})


//improved way - res.locals.messages

app.use((req, res, next) => {       //set up a middleware
    res.locals.messages = req.flash('success');     //locals object has the property that is local variables within the application.
    next();     //keep moving, now pass to every single ones
})

app.get('/farms', async (req, res) => {
    const farms = await Farm.find({});
    res.render('farms/index', { farms })        //no needs that message line
})
  
