const fs = require("fs");
const chalk = require("chalk");
const nodemon = require("nodemon");

const addNote = (title, body) => {
  const notes = loadNote();
  //filter function will run the entire list while find function return the first match
  const duplicateNote = notes.find((note) => note.title === title);

  //const duplicatedNotes = notes.filter((note) => note.title === title);
  //return true, if test result correct, then note duplicate, if false, not duplicated

  if (!duplicateNote) {
    notes.push({
      //not overwriting, just append the notes from the existing notes
      title: title,
      body: body,
    });
    saveNotes(notes); //save the note if there is no duplicate notes
    console.log(chalk.green.inverse("New Note Added!"));
  } else {
    //when we have returned true value in the filter test
    console.log(chalk.red.inverse("Note title taken!!!"));
  }
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

const readNote = (title) => {
  const notes = loadNote();
  const note = notes.find((note) => note.title === title); //return the first found value

  if (note) {
    console.log(chalk.inverse(note.title));
    console.log(note.body);
  } else {
    console.log(chalk.red.inverse("Note not found!"));
  }
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
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
};
