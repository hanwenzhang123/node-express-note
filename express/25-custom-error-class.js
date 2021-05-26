res.status(401)


//AppError.js

class AppError extends Error {    //extends the parent class error
    constructor(message, status) {
        super();    //superclass (parent) objects. we call the parent's constructor method and gets access to the parent's properties and methods:
        this.message = message;
        this.status = status;   //we need to make our own status
    }
}

module.exports = AppError;


//index.js
const AppError = require('./AppError');

const verifyPassword = (req, res, next) => {
    const { password } = req.query;
    if (password === 'chickennugget') {
        next();
    }
    throw new AppError('password required', 401);
    // res.send("PASSWORD NEEDED!")
    // throw new AppError('Password required!', 400)
  

app.get('/secret', verifyPassword, (req, res) => {   //withou the password, the page directs to 401, as we throw or own error, password required!
    res.send('MY SECRET IS: Sometimes I wear headphones in public so I dont have to talk to anyone')
})  
  
app.get('/error', (req, res) => {
    chicken.fly()     //chicken is not defined, it is an error message from javascript
})

app.get('/admin', (req, res) => {         // here is always throwing the AppError, and shows as You are not an Admin!
    throw new AppError('You are not an Admin!', 403)    //403- we know who you are but you are not an admin
})

app.use((err, req, res, next) => {
    const { status = 500, message = 'Something Went Wrong' } = err;   //default 500 error. the AppError we defined
    res.status(status).send(message)
})
   
