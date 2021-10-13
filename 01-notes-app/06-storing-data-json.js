Storing Data with JSON

//1-json.js
const book = {
  title: "Ego is the enemy",
  author: "Ryan Holiday",
};

const bookJSON = JSON.stringify(book);
console.log(bookJSON.title);
//undefined
console.log(bookJSON);
//{"title":"Ego is the enemy","author":"Ryan Holiday"}

const parsedData = JSON.parse(bookJSON);
console.log(parsedData.author);
//Ryan Holiday

//JSON.stringify takes an object and convert it to JSON
//JSON.parse takes JSON data in and convert it to an object -> we are able to read it


//1-json.js
const fs = require("fs");
const book = {
  title: "Ego is the enemy",
  author: "Ryan Holiday",
};

const bookJSON = JSON.stringify(book);
fs.writeFileSync("1-json.json", bookJSON);

//1-json.json
{"title":"Ego is the enemy","author":"Ryan Holiday"}

//1-json.js
const fs = require("fs");

const dataBuffer = fs.readFileSync("1-json.json"); //get the binary data
console.log(dataBuffer);
//<Buffer 7b 22 74 69 74 6c 65 22 3a 22 45 67 6f 20 69 73 20 74 68 65 20 65 6e 65 6d 79 22 2c 22 61 75 74 68 6f 72 22 3a 22 52 79 61 6e 20 48 6f 6c 69 64 61 79 ... 2 more bytes>

const dataJSON = dataBuffer.toString(); //convert to standard readable string in JavaScript
console.log(dataJSON);
//{"title":"Ego is the enemy","author":"Ryan Holiday"}
console.log(dataJSON.title);
//undefined -> dataJSON is considered a string not an object

const data = JSON.parse(dataJSON); //parse the json string data into an object
console.log(data);
//{ title: 'Ego is the enemy', author: 'Ryan Holiday' }
console.log(data.title); //then we access a property from it
//Ego is the enemy

console.log(JSON.parse(dataBuffer));
//{ title: 'Ego is the enemy', author: 'Ryan Holiday' }


//Challenge
const fs = require('fs')

const dataBuffer = fs.readFileSync('1-json.json')
const dataJSON = dataBuffer.toString()
const user = JSON.parse(dataJSON)   //convert to JS object

user.name = 'Gunther'
user.age = 54

const userJSON = JSON.stringify(user)     //conver JS to JSON
fs.writeFileSync('1-json.json', userJSON)

//1-json.json
{"name":"Gunther","age":54}
  
