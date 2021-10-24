//src/index.js - starting point of our application
const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const app = express()   //setup express
const port = process.env.PORT || 3000   //define the port

app.use(express.json())

app.post('/users', (req, res) => {  //when use app.post, path and callback function
    const user = new User(req.body)   //creaate the new user

    user.save().then(() => {    //save the new user
        res.status(201).send(user)  //senback to us
    }).catch((e) => {
        res.status(400).send(e)
    })
})

app.post('/tasks', (req, res) => {
    const task = new Task(req.body)

    task.save().then(() => {
        res.status(201).send(task)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

app.listen(port, () => {    //listen on port and provide the message
    console.log('Server is up on port ' + port)
})


//src/models/user.js
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


//src/models/task.js
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

 
