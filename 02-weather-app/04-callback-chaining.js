//Callback Chaining
//app.js
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const address = process.argv[2]   //the value we passed when we run node

if (!address) {
    console.log('Please provide an address')
} else {
    geocode(address, (error, data) => {
        //error handling, also stop keeping running the code moving forwards
        if (error) {        //we can do if else, or return in if statement
            return console.log(error)   //return stops function execution after printing the error
        }
      
        //one after another one, chaining multiple callbacks
        //if we do have the data, data is the success output from the geocode
        forecast(data.latitude, data.longitude, (error, forecastData) => {
            if (error) {
                return console.log(error)
            }
            console.log(data.location)    //print out the location from the location object in geocode.js
            console.log(forecastData)   //the response statement we get from the forecast
        })
    })
}


//Destructuring and Property Shorthand 
//app.js
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const address = process.argv[2];

if (!address) {
  console.log("Please provide an address");
} else {
  geocode(address, (error, { latitude, longitude, location } = {}) => { //default function parameters
    if (error) {
      return console.log(error);
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return console.log(error);
      }

      console.log(location);
      console.log(forecastData);
    });
  });
}


//utils/geocode.js
const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodedURLComponent(address) +
    ".json?access_token=pk.eyJ1IjoiYW5kcmV3bWVhZDEiLCJhIjoiY2pvOG8ybW90MDFhazNxcnJ4OTYydzJlOSJ9.njY7HvaalLEVhEOIghPTlw&limit=1";

  request({ url, json: true }, (error, { body }) => {   //response.body
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location. Try another search.", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;


//utils/forecast.js
const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=e84129bc20b99e3b1452c36379b4e3ff&query=" +
    latitude +
    "," +
    longitude +
    "&units=f";

  request({ url, json: true }, (error, { body }) => {  //response.body
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined, 
        body.current.weather_descriptions[0] +
          ". It is currently " +
          body.current.temperature +
          " degrees out."
      );
    }
  });
};

module.exports = forecast;

 
