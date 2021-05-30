const adminRoutes = require('./routes/admin')
app.use('/admin', adminRoutes)

//admin.js

const express = require('express');
const router = express.Router();

//every route in this js file
router.use((req, res, next) => {    //if we want to pass all the router to this middleware, we just use router.use
    if (req.query.isAdmin) {  
        return next();
    }
    return res.send("SORRY NOT AN ADMIN!")  
})

router.get('/topsecret', (req, res) => {
    res.send('THIS IS TOP SECRET')
})
router.get('/deleteeverything', (req, res) => {   //localhost:3000/admin/deleteeverything?isAdmin=true
    res.send('OK DELETED IT ALL!')
})

module.exports = router;



//we can also use do this for a specific route

const isAdmin = (req, res, next) => {       //if we do localhost:3000/admin/123 we get sorry not an admin
    if (req.query.isAdmin) {                //localhost:3000/admin/123?isAdmin=true  - we view the page
        return next();
    }
    return res.send("SORRY NOT AN ADMIN!")  
}

router.get('/:id', isAdmin, (req, res) => {
    res.send("VIEWING ONE SHELTER")
})



//req.query vs req.params

req.query will return a JS object after the query string is parsed.
/user?name=tom&age=55 
  - req.query would yield {name:"tom", age: "55"}


req.params will return parameters in the matched route. 
If your route is /user/:id and you make a request to /user/5 
  - req.params would yield {id: "5"}


req.query is the query string sent to the server, example /page?test=1, req.param is the parameters passed to the handler.

app.get('/user/:id', handler);, going to /user/blah, req.param.id would return blah;

  
