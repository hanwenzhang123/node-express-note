const path = require('path')  //node path module
const express = require('express')

const app = express()

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public') //get the path to the folder

app.use(express.static(publicDirectoryPath))  //static middleware to configure the directory

app.listen(port, () => {    //start the server up
    console.log(`Server is up on port ${port}!`)
})

WebSockets
- allows for full-duplex communication
- websockets is a separate protocol from HTTP
- persistent connection between client and server
