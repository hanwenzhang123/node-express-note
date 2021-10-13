//Getting User Inputs
console.log(process.argv);
//Always return 3 string inside the process.argv
1. path to node js executable in your machine
2. path to app.js file on your machine
3. value we provided, like if we do "node app.js Hanwen", we get "Hanwen" here

node app.js Hanwen
console.log(process.argv[2]);   //Hanwen

const command = process.argv[2]

if (command === 'add') {
 console.log("Adding note!") 
} else if (command === 'remove') { 
 console.log("Removing note!") 
}

node app.js add --title="This is my title"  //set title
//here we get a 4th string "--title=This is my title"
  '/usr/local/bin/node',
  '/Users/hanwenzhang/Desktop/note-app/app.js',
  'add',
  '--title=This is my title'

