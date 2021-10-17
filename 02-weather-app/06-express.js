//Hello Express - set up the routes
http://expressjs.com/

npm init -y
npm i express

//app.js
const express = require('express')    //get the library

const app = express()   //store our express application

app.get('', (req, res) => {   //request(send out), response(send back)
    res.send('Hello express!')    //send to the location of where request starts
})                                //display in browser window if request from the broswer

app.get('/help', (req, res) => {
    res.send('Help page')
})

app.get('/about', (req, res) => {
    res.send('About')
})

app.get('/weather', (req, res) => {
    res.send('Your weather')
})

app.listen(3000, () => {    //start the server
    console.log('Server is up on port 3000.')
})


//Serving up HTML and JSON
We either send back HTML designed to be rendered in the browser 
or send back JSON designed to be consumed and used by code.
- still use res.send(), just change what we pass inside.

//app.js
const express = require('express')

const app = express()

app.get('', (req, res) => {   //html
    res.send('<h1>Weather</h1>')
})

app.get('/help', (req, res) => {  //json - can be object or array like object
    res.send([{
        name: 'Andrew'
    }, {
        name: 'Sarah'
    }])
})

app.get('/about', (req, res) => {
    res.send('<h1>About</h1>')
})

app.get('/weather', (req, res) => {
    res.send({
        forecast: 'It is snowing',
        location: 'Philadelphia'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})
 
 
