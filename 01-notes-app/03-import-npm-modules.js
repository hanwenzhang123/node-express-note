// Importing npm Modules
//check version
node -v
npm -v

//initialize npm
npm init
-> package.json (javascript object notation)

//install package
npm i {name of the package}
npm i validator
-> package-lock.json

//use require to use npm packages
const validator = require('validator')

console.log(validator.isEmail("zhang@example.com"));  //true
console.log(validator.isURL("https/mead.io"));    //false

//install dependencies of the application, get the folder of the node_modules back
npm install


//Printing in Color
npm i chalk

//app.js
const chalk = require("chalk");
console.log(chalk.blue.bold.underline("Hello"));
const greenMsg = chalk.green.inverse("Success!");
console.log(greenMsg);


//Global npm Modules and nodemon
//sudo stands for superuser do.
//-g is for globally
sudo npm install nodemon -g 

//run node file automatically
nodemon {name of the file like app.js}
press control c to stop nodemon
  
