Notes Taking App 
Node.js Module System
if you want to go ahead and read or write from the file system, 
if you want to connect it to a database or start up a Web server, 
- all of those are going to require you to use the node module system.

File System - https://nodejs.org/api/fs.html - https://www.w3schools.com/nodejs/nodejs_filesystem.asp
- Node.js file system module allows you to work with the file system on your computer.
- Allow us access the operating systems, file system will be able to read and write, append files and figure out if a given file or directory exists.

const fs = require('fs'); 
- calling require function is how we load in the node modules
- the required function returns all of the stuff from that module and we have to store that on a variable "fs" now.

//non-blocking - takes a callback function
Read files - fs.readFile(): read files on your computer.
Create  - fs.appendFile(): appends specified content to a file. If the file does not exist, the file will be created
        - fs.open(): takes a "flag" as the second argument, if the flag is "w" for "writing", is opened for writing
        - fs.writeFile(): replaces the specified file and content, If the file does not exist, a new file will be created
Update files - fs.appendFile(): appends the specified content at the end of the specified file
             - fs.writeFile(): replaces the specified file and content
Delete files - fs.unlink(): deletes the specified file
Rename files - fs.rename(): renames the specified file

//Sync - does not take a callback, blocks, the execution of your script will be paused untill the process is finished
fs.writeFileSync() - takes 2 argument, 1st the file name, 2nd the input
fs.appendFileSync() - takes 2 argument, 1st the file name, 2nd the input you want to append

//app.js
const fs = require('fs');
fs.writeFileSync("notes.txt", "This file was created by Node.js")
fs.appendFileSync("notes.txt", "I live in New York.");
