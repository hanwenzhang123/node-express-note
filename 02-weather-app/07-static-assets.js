//Serving up Static Assets
//Serving up CSS, JS, Images, and More
__dirname - contains a path to the directory the current script lives in.
__filename - provides the path to the directory the file lives in, it provides the path to the file itself.

//app.use()
a way to customize your server

//app.set()
app.set(name, value)
used to assigns the setting name to value

//express.static()
takes a value you want to serve
serve static files such as images, CSS files, and JavaScript files
exposes a directory or a file to a particular URL so its contents can be publicly accessed
// Static Middleware 
app.use(express.static(path.join(__dirname, 'public')))

//path.join()
//a method joins the specified path segments into one path.
var path = require('path');
var x = path.join(paths);


//src/app.js 
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')   //point to a path
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')   //tell which templating engine you use, like handlerbar, ejs
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Andrew Mead'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Andrew Mead'
    })
})

app.get('/weather', (req, res) => {
    res.send({
        forecast: 'It is snowing',
        location: 'Philadelphia'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Help article not found.'
    })
})

// app.get('*', (req, res) => {        //wildcard, always the last one
//     res.send("My 404 page")         //send the error message
// })

app.get('*', (req, res) => {    //wildcard, always the last one
    res.render('404', {     //render the handlerbar file
        title: '404',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})


//templates/views/index.hbs - the root file
//href - This is the path to the file we're trying to load. use relative (./css/styles.css) or absolute (/css/styles.css)
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="/css/styles.css">
    <script src="/js/app.js"></script>
</head>
<body>
    {{>header}}
    {{>footer}}
</body>
</html>

//templates/views/help.hbs
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="/css/styles.css">
</head>
<body>
    {{>header}}
    <p>{{helpText}}</p>
    {{>footer}}
</body>
</html>

//templates/views/about.hbs
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="/css/styles.css">
</head>
<body>
    {{>header}}
    <img src="/img/me.png">
    {{>footer}}
</body>
</html>

//templates/views/404.hbs
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="/css/styles.css">
</head>
<body>
    {{>header}}
    <p>{{errorMessage}}</p>
    {{>footer}}
</body>
</html>


//templates/partials/header.hbs
<h1>{{title}}</h1>
<div>
    <a href="/">Weather</a>
    <a href="/about">About</a>
    <a href="/help">Help</a>
</div>

//templates/partials/footer.hbs
<p>Created by {{name}}</p>


//public/css/styles.css
h1 {
    color: grey;
}
img {
    width: 250px;
}

//public/js/app.js
console.log('Client side javascript file is loaded!')
  
