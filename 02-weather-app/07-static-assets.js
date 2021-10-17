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


//app.js 
//we serve static files, so no needs app.get for every single route
//we can just do /about.html /help.html in the path
const path = require('path')
const express = require('express')

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')   //point to a path

app.set('view engine', 'hbs')   //tell which templating engine you use, like handlerbar, ejs
app.use(express.static(publicDirectoryPath))

app.get('/weather', (req, res) => {
    res.send({
        forecast: 'It is snowing',
        location: 'Philadelphia'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})


//public/index.html - the root file
//href - This is the path to the file we're trying to load. use relative (./css/styles.css) or absolute (/css/styles.css)
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="/css/styles.css">
    <script src="/js/app.js"></script>
</head>
<body>
    <h1>From a static file</h1>
</body>
</html>

//public/help.html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="/css/styles.css">
</head>
<body>
    <h1>Help</h1>
</body>
</html>

//public/about.html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="/css/styles.css">
</head>
<body>
    <h1>About</h1>
    <img src="/img/me.png">
</body>
</html>

//public/css/styles.css
h1 {
    color: grey;
}
img {
    width: 250px;
}

//public/js/app.js
console.log('Client side javascript file is loaded!')
 
