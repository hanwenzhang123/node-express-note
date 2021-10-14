//Arrow Function Example
const tasks = {
  tasks: [
    {
      text: "Grocery shopping",
      completed: true,
    },
    {
      text: "Clean yard",
      completed: false,
    },
    {
      text: "Film course",
      completed: false,
    },
  ],
  getTasksToDo() {
    return this.tasks.filter((task) => task.completed === false);
  },
  // getTasksToDo() {
  //     const tasksToDo = this.tasks.filter((task) => {
  //         return task.completed === false
  //     })
  //     return tasksToDo
  // }
};

console.log(tasks.getTasksToDo());


//notes.js
const fs = require("fs");
const chalk = require("chalk");

const getNotes = () => {
  return "Your notes...";
};

const addNote = (title, body) => {
  const notes = loadNote();
  const duplicatedNotes = notes.filter((note) => note.title === title);
  //return true, if test result correct, then note duplicate, if false, not duplicated

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

const removeNote = function (title) {
  const notes = loadNotes();

  const notesToKeep = notes.filter((note) => note.title !== title);
  //keep the notes that is not the one with the title we entered for delete

  if (notes.length > notesToKeep.length) {
    console.log(chalk.green.inverse("Note Removed!"));
    saveNotes(notesToKeep);
  } else {
    console.log(chalk.red.inverse("No note found!"));
  }
};

const listNotes = () => {
  const notes = loadNote();

  console.log(chalk.inverse("Your notes"));

  notes.forEach((note) => {
    console.log(note.title);
  });
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const loadNote = () => {
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
  listNotes: listNotes,
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
  handler(argv) {
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
  handler(argv) {
    notes.removeNote(argv.title);
  },
});

//Create list command
yargs.command({
  command: "list",
  describe: "List your notes",
  handler() {
    notes.listNotes();
  },
});

//Create read command
yargs.command({
  command: "read",
  describe: "Read a note",
  handler() {
    console.log("Reading a note!");
  },
});

console.log(yargs.argv);
 
