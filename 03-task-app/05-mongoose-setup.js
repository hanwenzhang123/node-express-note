//Mongoosee - a MongoDB ORM library 
//ORM - Object Document Mapper - map your objects in your code
//we can use mongoose to add data validation and other advanced features, not only the crud operation

//Model
A model allows us to model something in the real world that we want to be able to store in the database.
we create models for all of the collections that we want and then we use the model to describe the data.

//Mongoose Schema vs. Model
A Mongoose model is a wrapper on the Mongoose schema. 
Mongoose schema defines the structure of the document, default values, validators, etc.
Mongoose model provides an interface to the database for creating, querying, updating, deleting records, etc.

//mongoose.model('Cat', { name: String });
1st: the name for your model, 2nd: an obj definition where we define all the field we want


//https://mongoosejs.com/
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test'); //connect to the database

const Cat = mongoose.model('Cat', { name: String });  //create modal -  a cat has a name and the name should be a string

const kitty = new Cat({ name: 'Zildjian' });  //create a new instance and store it to variable
kitty.save().then(() => console.log('meow')); //do something with the instance


//src/db/mongoose.js
const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {    //connect to the database
    useNewUrlParser: true,
    useCreateIndex: true
})

const User = mongoose.model('User', {   //1st: the name for your model, 2nd: an obj definition where we define all the field we want
    name: {
        type: String
    },
    age: {
        type: Number
    }
})

const me = new User({
    name: 'Andrew',
    age: 27
})

//me.save() -> simply save the data that we stored which returns a promise

me.save().then(() => {
    console.log(me)
}).catch((error) => {
    console.log('Error!', error)
})

const Task = mongoose.model('Task', {
    description: {
        type: String
    },
    completed: {
        type: Boolean
    }
})

const task = new Task({
    description: 'Learn the Mongoose library',
    completed: false
})

task.save().then(() => {
    console.log(task)
}).catch((error) => {
    console.log(error)
})
  
