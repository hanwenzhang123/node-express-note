mkdir flashcards
cd flashcards
npm init -y //use this with y to get everything we needed
{
  "name": "flashcards",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}

npm install express --save  //save and add to the json file for the dependency


//Install express, version 4.15.2, and save it to the package.json file.
npm install express@4.15.2 --save



//nodemon - reload, automatically

//when this command doesn't work:
npm install -g nodemon
//recommend to use this one instead:
sudo npm install -g nodemon

//You can get rid of error by entering the command:
npm i pstree.remy@1.1.0 -D


nodemon -v:
//"^1.18.6"
node -v:
//v10.13.0
Operating system/terminal environment:
//ubunutu 18.04
Command you ran:
npm start
//in package.json I have "start": "nodemon"



//questions
Web frameworks take care of low level code, allowing you to focus on what makes your app different from anyone else's.

In order to use node modules in a file, they need to be _____ using the _____ method
required, require

To start a node project in a directory without a package.json file run the following command:
npm init

What is a word for solutions to common problems in software?
Patterns
  
