// WebSockets
// - allows for full-duplex communication
// - websockets is a separate protocol from HTTP
// - persistent connection between client and server

//src/index/js
const path = require('path')  //node path module
const http = require('http')    //http core module
const express = require('express')
const socketio = require('socket.io')   //load in the socket library

const app = express()
const server = http.createServer(app)   //using raw http server that allows us create a new web server
const io = socketio(server) //calling socketio to configure socket io to work in the raw http server

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public') //get the path to the folder

app.use(express.static(publicDirectoryPath))  //static middleware to configure the directory

io.on('connection', () => { //listening to a given event to occur, which is called connection
    console.log('New WebSocket connection')
})

server.listen(port, () => {  //using server.listen to start the server up
    console.log(`Server is up on port ${port}!`)
})

//public/index.html
<!DOCTYPE html>
<html>
    <head>

    </head>
    <body>
        Chat App
        <script src="/socket.io/socket.io.js"></script>     => script that we load in for socket io library
        <script src="/js/chat.js"></script>
    </body>
</html>

//public/js/chat.js
io()    //connect to the server
 
