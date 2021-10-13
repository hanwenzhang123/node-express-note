//Argument Parsing with Yargs

//yargs - better parse command line arguments
npm i yargs
const yargs = require("yargs");
console.log(yargs.argv);  //{ _: [], '$0': 'app.js' }

node app.js add --title="Things to buy"
//{ _: [ 'add' ], title: 'Things to buy', '$0': 'app.js' }


//app.js
const yargs = require("yargs");

//Customize yargs version
yargs.version("1.1.0");

// Create add command
yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,       //required
      type: "string",       //string value
    },
    body: {
      describe: "Note body",
      demandOption: true,
      type: "string",
    },
  },
  handler: function (argv) {
    console.log("Title: " + argv.title);
    console.log("Body: " + argv.body);
  },
});

//Create remove command
yargs.command({
  command: "remove",
  describe: "Remove a note",
  handler: function () {
    console.log("Removing a note!");
  },
});

//Create read command
yargs.command({
  command: "read",
  describe: "Read a note",
  handler: function () {
    console.log("Reading a note!");
  },
});

//Create list command
yargs.command({
  command: "list",
  describe: "List your notes",
  handler: function () {
    console.log("Listing out all notes!");
  },
});

console.log(yargs.argv);


//node app.js read
Reading a note!
{ _: [ 'add' ], '$0': 'app.js' }

//node app.js --help
-> check commands
Commands:
  app.js add     Add a new note
  app.js remove  Remove a note
  app.js read    Read a note
  app.js list    List your notes
   
//node app.js add --title="My Title" --body="My Body"   
Title: My Title
Body: My Body
{ _: [ 'add' ], title: 'My Title', body: 'My Body', '$0': 'app.js' }
 
//need both title and body, otherwise missing required argument
//node app.js add --title="My Title"
Missing required argument: body
  
