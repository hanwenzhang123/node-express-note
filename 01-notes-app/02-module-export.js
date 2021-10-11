//Importing Your Own Files

//Example 1
//app.js
const name= require("./utils.js");
console.log(name);  //Hanwen

//utils.js
console.log("utils.js");
const name = "Hanwen";
module.exports = name;


//Example 2
//app.js
const add = require("./utils.js");
const sum = add(4, -2);
console.log(sum);   //2

//utils.js
console.log("utils.js");
const name = "Hanwen";
const add = function (a, b) {
  return a + b;
};
module.exports = add;


//Example 3
//app.js
const getNotes = require("./notes.js");
const msg = getNotes();
console.log(msg);   //Your notes...

//notes.js
const getNotes = function () {
  return "Your notes...";
};
module.exports = getNotes;

 
