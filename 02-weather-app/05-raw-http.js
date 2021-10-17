//HTTP Requests Without a Library
//https://nodejs.org/api/http.html
const https = require('https')  //Secure Hypertext Transfer Protocol

//raw-http.js
const http = require('http')
const url = 'http://api.weatherstack.com/current?access_key=e84129bc20b99e3b1452c36379b4e3ff&query=40,-75&units=f'

const request = http.request(url, (response) => {   //refer to the request itself, store the value to the variable
    let data = ''   //let will reassign the value

    response.on('data', (chunk) => {    //listen to individual chunks when the data comes in, can be one time or multiple times
        data = data + chunk.toString()    //assign the data with the chunks that convert to buffer to string
    })

    response.on('end', () => {
        const body = JSON.parse(data)   //parse it to as a JS object
        console.log(body)   //we get parsed js object
    })

})

request.on('error', (error) => {    //error handling setup
    console.log('An error', error)
})

request.end()   //end setting up the request, fire it up
 
