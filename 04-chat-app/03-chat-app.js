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

io.on('connection', (socket) => {   //setup socket io connection, only use io.on for connection
    console.log('New WebSocket connection')

    socket.emit('message', 'Welcome!')    //send "Welcome" when "message" event occurs
    socket.broadcast.emit("message", "A new user has joined!") //broadcast - send to everyone but the particular socket

    socket.on('sendMessage', (message) => { //listening the event for sendMessage, get access to the message data at callback function
        io.emit('message', message) //emit the message event and sending the message data
    })
    
    socket.on('sendLocation', (coords) => {
        io.emit('message', `https://google.com/maps?q=${coords.latitude},${coords.longitude}`)
    })
    
    socket.on("disconnect", () => { //listen to the disconnect event
        io.emit('message', "A user has left!")   //no needs to broadcast since user has been disconnected, show to the user who has not left in the chat
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

document.querySelector('#message-form').addEventListener('submit', (e) => {      //UI for sending messages
    e.preventDefault()  //prevent default behavior for the form in order to prevent default page refresh

    const message = e.target.elements.message.value   //get the text that the user typed in

    socket.emit('sendMessage', message)   //emit the event
})

document.querySelector('#send-location').addEventListener('click', () => {      //UI for sharing your location via geo location API
    if (!navigator.geolocation) {   //if the user does not have the supprot for avigator.geolocation
        return alert('Geolocation is not supported by your browser.')   //stop function execution
    }

    navigator.geolocation.getCurrentPosition((position) => {    //synchronous, takes some time to get the current position
//         console.log(position)   //coords -> latitude & longitude
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    })
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
        <button id="send-location">Send location</button>

        <script src="/socket.io/socket.io.js"></script>
        <script src="/js/chat.js"></script>
    </body>
</html>
 
