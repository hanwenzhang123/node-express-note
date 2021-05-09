//CONSOLE
mkdir myapp
cd myapp
touch server.js

npm init    //json set up
//entry point: (server.js)
npm install express --save    //it adds express into your json under dependencies

//IDE
const express = require('express');
const app = express()

app.listen(3000, function() => {
  console.log('Server started on port 3000');
});
