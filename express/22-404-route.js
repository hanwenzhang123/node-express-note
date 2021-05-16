const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(morgan('tiny'));    

app.use((req, res, next) => {
    req.requestTime = Date.now();
    console.log(req.method, req.path);
    next();
})

app.use('/dogs', (req, res, next) => {
    console.log("I LOVE DOGS!!")
    next();
})

app.get('/', (req, res) => {
    console.log(`REQUEST DATE: ${req.requestTime}`)
    res.send('HOME PAGE!')
})

app.get('/dogs', (req, res) => {
    console.log(`REQUEST DATE: ${req.requestTime}`)
    res.send('WOOF WOOF!')
})

app.use((req, res) => {
    res.status(404).send('NOT FOUND!')    //at the end of the code, only send 404 when nothing matched above
})    //can be only res.send('NOT FOUND!') at the end of the page, but with status code 404 more clear


app.listen(3000, () => {
    console.log('App is running on localhost:3000')
})


  
