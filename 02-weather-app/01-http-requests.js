//Asynchronous
asynchronous non blocking node application
- your application is going to continue to be able to do other things while it is waiting for some long running IO process to complete.

setTimeout - allows us to run some code after a specific amount of time has passed and set time out
take 2 argument - 1st a function, 2nd a number in milliseconds

//Event Loop
Call Stack -> Node APIs -> Callback Queue
main() is always added first in callstack (first in last out)


//Making HTTP Requests using Weather Stack
npm init -y
npm i postman-request

//http://api.weatherstack.com/current?access_key=value&query=value

//app.js
const request = require("postman-request");
const url =
  "https://api.weatherstack.com/current?access_key=40d22cb5b5a5eec6aaed9628d66d1&query=new%20york&units=f";

request({ url: url }, (error, response) => {
  const data = JSON.parse(response.body); //parse() -> JSON to JS object
  console.log(data); //print out key/value
  console.log(data.current); //print out the value based on the key
});


//Customizing HTTP Requests
request({ url: url, json: true }, (error, response) => {  //request is parsing the JSON for us since we set json.true
  console.log(response.body.current);
  console.log("It is currently " + response.body.current.temperature + " degree out there. It feels like " + response.body.ccurrent.feelslike + "degree out.")
});


//HTTP Request - Geocoding using MapBox
//Address -> Lat/Long -> Weather
const geocodeURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiaGFud2Vuemhhbmc4ODgiLCJhIjoiY2t1dTcwdG9kMGQ4ZTJvbGZkMHU0OHVvdSJ9.rZx4L3A0LD7BZgvalUQb8A";

request({ url: geocodeURL, json: true }, (error, response) => {
  const latitude = response.body.features[0].center[1];
  const longitude = response.body.features[0].center[0];
  const.log(latitude, longitude)
})


//Handling Errors
request({ url: url }, (error, response) => {
  if(error){    //if error occcurs but on a higher level like connection failed
    console.log("Unable to connect to weather service!")
  } else if (response.body.error) {   //low level error message like can not find the data you look for
    console.log("Unable to fnd location!")
  } else {    //if all good, we print the weather status
    console.log(response.body.daily.data[0].summary + " It is currently " + response.body.current.temperature + " degree out there.")
  }
});


//Handling Errors - Geocoding
request({ url: geocodeURL, json: true }, (error, response) => {
  if(error){
    console.log("Unable to connect to location services!")
  } else if (response.body.features.length === 0) {
    console.log("Unable to find location. Try another search!")
  } else {
    const latitude = response.body.features[0].center[1];
    const longitude = response.body.features[0].center[0];
    const.log(latitude, longitude)
  }
})

