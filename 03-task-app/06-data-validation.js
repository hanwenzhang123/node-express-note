//Data Validation and Sanitization
https://www.npmjs.com/package/validator
npm i validator

//mongoose.js
const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
})

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,     //have to enter the data, required field
        trim: true      //convert to no space
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {       //the value we validate
            if (!validator.isEmail(value)) {    //check if it is valid email using the library validator
                throw new Error('Email is invalid') //throw an error if there is something wrong with the entered value
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,   //set validator
        trim: true,
        validate(value) {   
            if (value.toLowerCase().includes('password')) {     //set up if statement to trigger the error if the condition met
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    age: {
        type: Number,
        default: 0,         //set default value
        validate(value) {       //no needs for library for simple logic
            if (value < 0) {        //if the age data value less than 0, we throw error
                throw new Error('Age must be a postive number')
            }
        }
    }
})

// const me = new User({
//     name: '   Andrew  ',
//     email: 'MYEMAIL@MEAD.IO   ',
//     password: 'phone098!'
// })

// me.save().then(() => {
//     console.log(me)
// }).catch((error) => {
//     console.log('Error!', error)
// })

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

const task = new Task({
    description: '  Eat lunch'
})

task.save().then(() => {
    console.log(task)
}).catch((error) => {
    console.log(error)
})
  
