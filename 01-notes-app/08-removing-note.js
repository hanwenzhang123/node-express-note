//notes.js
const fs = require("fs");
const chalk = require("chalk");

const getNotes = function () {
  return "Your notes...";
};

const addNote = function (title, body) {
  const notes = loadNote();
  const duplicatedNotes = notes.filter(function (note) {
    //return true, if test result correct, then note duplicate, if false, not duplicated
    return note.title === title;
  });

  if (duplicatedNotes.length === 0) {
    notes.push({
      //not overwriting, just append the notes from the existing notes
      title: title,
      body: body,
    });
  } else {
    //when we have returned true value in the filter test
    console.log("Note title taken!!!");
  }

  saveNotes(notes);
};

const removeNote = function (title) {   //add this new function here for removing notes
  const notes = loadNotes();

  const notesToKeep = notes.filter(function (note) {
    //keep the notes that is not the one with the title we entered for delete
    return note.title !== title;
  });

  if (notes.length > notesToKeep.length) {
    console.log(chalk.green.inverse("Note Removed!"));
    saveNotes(notesToKeep);
  } else {
    console.log(chalk.red.inverse("No note found!"));
  }
};

const saveNotes = function (notes) {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const loadNote = function () {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON); //pass the existing data when we have notes in the file
  } catch (e) {
    return []; //no data then return empty array, just create the file
  }
};

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
};


//app.js
const chalk = require("chalk");
const yargs = require("yargs");
const notes = require("./notes.js");

//Customize yargs version
yargs.version("1.1.0");

// Create add command
yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true, //required
      type: "string", //string value
    },
    body: {
      describe: "Note body",
      demandOption: true,
      type: "string",
    },
  },
  handler: function (argv) {
    notes.addNote(argv.title, argv.body); //pass the note inputs to the function imported from notes.js
  },
});

//Create remove command
yargs.command({
  command: "remove",
  describe: "Remove a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  handler: function (argv) {
    notes.removeNote(argv.title);
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



