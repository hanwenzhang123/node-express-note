// Resource Creation Endpoints with Promises
// Resource Reading Endpoints with Promises
- Set up Promise based HTTP REST API routes/endpoints


//src/index.js - starting point of our application
const express = require('express')
require('./db/mongoose')        //require the mongoose, no needs to grab anything, just have the file run, connect database
const User = require('./models/user')    //require the user model
const Task = require('./models/task')   //require the task model

const app = express()   //setup express
const port = process.env.PORT || 3000   //define the port

app.use(express.json()) //app.use: customize our server. here we configure express to automatically pass the incoming JSON to an object so we can access it in our request

app.post('/users', (req, res) => {  //when use app.post, path and callback function
    const user = new User(req.body)   //create the new user using req.body (incoming data body)

    user.save().then(() => {    //create the new user, save to the databases, then call handle success
        res.status(201).send(user)  //send back the user we posted 
    }).catch((e) => {
        res.status(400).send(e)     //send back the error
    })
})

app.get('/users', (req, res) => {   //the find() method is from mongoose queries, receive an object argument
    User.find({}).then((users) => {  //.find({}) - for looking everything in the database
        res.send(users)     //send the user back
    }).catch((e) => {
        res.status(500).send()  //500 internal server error, like db connection is out
    })
})

app.get('/users/:id', (req, res) => {  //id is dynamic
    const _id = req.params.id   //the id in the url

    User.findById(_id).then((user) => {     //.findById(_id), not an error if the id not exist
        if (!user) {        //going to run but may not have the user exist in db
            return res.status(404).send()   //send back a 404
        }

        res.send(user)      //all good, then sencd back the user data
    }).catch((e) => {
        res.status(500).send()  //when things go wrong, send back a 500
    })
})

app.post('/tasks', (req, res) => {
    const task = new Task(req.body)     //create new task, req.body is the task we try to create in the database

    task.save().then(() => {        //save to the database
        res.status(201).send(task)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

app.get('/tasks', (req, res) => {
    Task.find({}).then((tasks) => { //.find({}) - for looking everything in the database
        res.send(tasks)  //send back all the tasks we look for
    }).catch((e) => {
        res.status(500).send()
    })
})

app.get('/tasks/:id', (req, res) => {   //with id in the url
    const _id = req.params.id       //get the id from params

    Task.findById(_id).then((task) => { //find the specific id, then do something if successful
        if (!task) {    //conditional logics
            return res.status(404).send()
        }

        res.send(task)  //send the 200 data
    }).catch((e) => {
        res.status(500).send()
    })
})

app.listen(port, () => {    //listen on port and provide the message
    console.log('Server is up on port ' + port)
})


//src/models/user.js - split from mongoose.js, individual file for user data model
const mongoose = require('mongoose')
const validator = require('validator')    //using validator library for mongoose

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a postive number')
            }
        }
    }
})

module.exports = User


//src/models/task.js - individual file for task data model
const mongoose = require('mongoose')

const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

module.exports = Task


//src/db/mongoose.js
const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {  //connect mongodb through mongoose
    useNewUrlParser: true,
    useCreateIndex: true
})

 
