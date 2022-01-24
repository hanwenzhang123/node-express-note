//index.js
const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

io.on('connection', (socket) => {   //setup socket io connection
    console.log('New WebSocket connection')

    socket.emit('message', 'Welcome!')    //send "Welcome" when "message" event occurs
    socket.broadcast.emit("message", "A new user has joined!") //broadcast - send to everyone but the particular socket

    socket.on('sendMessage', (message) => { //listening the event for sendMessage, get access to the message data at callback function
        io.emit('message', message) //emit the message event and sending the message data
    })
})

server.listen(port, () => {
    console.log(`Server is up on port ${port}!`)
})

//public/js/chat.js
const socket = io()

socket.on('message', (message) => {   //listen to message
    console.log(message)
})

document.querySelector('#message-form').addEventListener('submit', (e) => {
    e.preventDefault()  //prevent default behavior for the form in order to prevent default page refresh

    const message = e.target.elements.message.value   //get the text that the user typed in

    socket.emit('sendMessage', message)   //emit the event
})

//public/index.html
<!DOCTYPE html>
<html>
    <head>

    </head>
    <body>
        Chat App
        
        <form id="message-form">
            <input name="message" placeholder="Message">
            <button>Send</button>
        </form>

        <script src="/socket.io/socket.io.js"></script>
        <script src="/js/chat.js"></script>
    </body>
</html>
 
