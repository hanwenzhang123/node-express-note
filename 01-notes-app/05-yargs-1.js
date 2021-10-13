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

//Create add command
yargs.command({
  command: "add",
  describe: "Add a new note",
  handler: function () {
    console.log("Adding a new note!");
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

//node app.js add
Adding a new note!
{ _: [ 'add' ], '$0': 'app.js' }

//node app.js --help
-> check commands
Commands:
  app.js add     Add a new note
  app.js remove  Remove a note
  app.js read    Read a note
  app.js list    List your notes
   
