//built-in error handler

//like if the first name and last name is empty when user not entering anything
//catch that and handle it by express built in error handler that makes an arguler html page

app.get('/error', (req, res) => {   //it set up by express to catch the error, 500 by default
    chicken.fly()   //it is not defined
})


//you can also throw error by yourself
const verifyPassword = (req, res, next) => {
    const { password } = req.query;
    if (password === 'chickennugget') {
        next();
    }
    throw new Error('password required');
    // res.send("PASSWORD NEEDED!")
    // throw new Error('Password required!')
}



//define custom error handlers

(err, req, res, next)   //standard name
                        //- put it at the last

//we define our own error handler instead of default /error

app.use((req, res) => {
    res.status(404).send('NOT FOUND!')
})

app.use((err, req, res, next) => {    //whenever there is an error thrown, our error handling middleware will run!
    console.log("******************************************")
    console.log("*****************ERROR*****************")
    console.log("******************************************")
  //res.status(500).send('ERROR!')
    console.log(err)    //the ugly html express default error page plus our own throw error message
    next(err)   //if we do not call next(), it is done, here we pass the default error handling again
})              //without passing the err as next(err), express will skip any remaining non-errorhandling routing and middleware functions


