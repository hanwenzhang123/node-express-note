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

let count = 0

io.on('connection', (socket) => { //socket is an object that contains information about the new connection
    console.log('New WebSocket connection')

    socket.emit('countUpdated', count)  //send events with name of the event, initial count and updated count

    socket.on('increment', () => {  //receive event from client to server
        count++   //action - increment the count
        io.emit('countUpdated', count)  //client gets the updated count, provide the count as data we send
    })
})

server.listen(port, () => {
    console.log(`Server is up on port ${port}!`)
})

//public/js/chat.js => the client
const socket = io()

 //return value, receiving the events from server emit the event
socket.on('countUpdated', (count) => {  //name needs to be matched with function call to initialize the connection
    console.log('The count has been updated!', count) //access to the count stored in server
})

document.querySelector('#increment').addEventListener('click', () => {  //add the event listener
    console.log('Clicked')
    socket.emit('increment')  //allow client to send event to server
})

//public/index.html
<!DOCTYPE html>
<html>
    <head>

    </head>
    <body>
        Chat App
        <button id="increment">+1</button>
        <script src="/socket.io/socket.io.js"></script>
        <script src="/js/chat.js"></script>
    </body>
</html>
