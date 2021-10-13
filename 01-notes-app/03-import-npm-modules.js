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
