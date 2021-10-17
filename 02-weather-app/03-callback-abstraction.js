//app.js
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

//call the function with arguments (address, callback)
geocode("Boston", (error, data) => {
  console.log("Error", error);
  console.log("Data", data);
});

//call the function with arguments (latitude, longitude, callback)
forecast(44.1545, -75.7088, (error, data) => {
  console.log("Error", error);
  console.log("Data", data);
});


//utils/geocode.js
const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodedURLComponent(address) +
    ".json?access_token=pk.eyJ1IjoiYW5kcmV3bWVhZDEiLCJhIjoiY2pvOG8ybW90MDFhazNxcnJ4OTYydzJlOSJ9.njY7HvaalLEVhEOIghPTlw&limit=1";

  request({ url: url, json: true }, (error, response) => {
    //pass 2 arguments: object to request, and the callback function
    //the error and data we passed in when we call the function in app.js
    if (error) {
      callback("Unable to connect to location services!", undefined); //2 args, error and data
    } else if (response.body.features.length === 0) {
      callback("Unable to find location. Try another search.", undefined);
    } else {
      callback(undefined, {
        //if the request is good, we get this object
        latitude: response.body.features[0].center[0],
        longitude: response.body.features[0].center[1],
        location: response.body.features[0].place_name,
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

  request({ url: url, json: true }, (error, response) => {
    //pass 2 arguments: object to request, and the callback function
    //the error and data we passed in when we call the function in app.js
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (response.body.error) {
      callback("Unable to find location", undefined);
    } else {
      //the code we run if everything goes well
      callback(
        undefined, //Error undefined
        response.body.current.weather_descriptions[0] +
          ". It is currently " +
          response.body.current.temperature +
          " degrees out."
      );
    }
  });
};

module.exports = forecast;
