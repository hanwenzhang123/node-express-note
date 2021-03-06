//Securely Storing Passwords
https://www.npmjs.com/package/bcryptjs
npm i bcryptjs

//Logging in Users

//index.js
const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

const bcrypt = require('bcryptjs')  //the pw algorithm we are using, not reversable

const myFunction = async () => {
    const password = 'Red12345!'
    const hashedPassword = await bcrypt.hash(password, 8) //second argument is the number of the rounds

    console.log(password)
    console.log(hashedPassword)   //this is what stores in the database

    const isMatch = await bcrypt.compare('Red12345!', hashedPassword) //bcrypt method .compare() to check if it matched
    console.log(isMatch)  //true or false
}

myFunction()


//models/user.js  - use mongoose.Schema to use the advanced feature mongoose middleware
const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({  //new operator new mongoose.Schema(), pass in an object for the schema method
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,   //make sure the email for user is unique
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

userSchema.statics.findByCredentials = async (email, password) => {     //userSchema.static for setting up something directly in the routers/user.js with findByCredentials
    const user = await User.findOne({ email })  //works like findById, but here findOne returns a single user that fits our search cretaria passed in with object
                                    //{email: email} - email in database is the same value as our passing in email value
    if (!user) {        //when there is no such user
        throw new Error('Unable to login')  //end the execution and throw the error
    }
    
    //when it works, we have the user in database
    const isMatch = await bcrypt.compare(password, user.password)   //here we check the password whether correct
    if (!isMatch) {     //if the password is not matched
        throw new Error('Unable to login')
    }

    return user
}

//Hash the plain text password before saving
//middleware to change the password with hash
userSchema.pre('save', async function (next) {  //pre - before any event; 1st is the name of the event, here is before the data has saved; 2nd is the function to run
    const user = this   //this gives us the object (the individual user) that is about to be saved (not saved yet)

    if (user.isModified('password')) {    //only if the password is modified
        user.password = await bcrypt.hash(user.password, 8)   //hash the password
    }

    next()    //need the next() to save the user, important to have next() be called. 
})

const User = mongoose.model('User', userSchema) //passing schema to the model, seperate schema and seperate model

module.exports = User


//routers/user.js
const express = require('express')
const User = require('../models/user')
const router = new express.Router()

router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users/login', async (req, res) => {   //endpoint for logging in users
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)    //find the user by the email and check the password, logics in models/user.js
        res.send(user)      //send the user back
    } catch (e) {
        res.status(400).send()
    }
})

router.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/users/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findById(_id)

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/users/:id', async (req, res) => {    //changing the update process to make sure the middleware runs correctly
    const updates = Object.keys(req.body)   //the list of the updates
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const user = await User.findById(req.params.id)   //get the user data through its id in the User schema

        updates.forEach((update) => user[update] = req.body[update])  //iterate the updates array, assign updated value through "user[update] = req.body[update]"
        await user.save()   //save the data, here is where our middleware would get executed

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router


//practice challenge with updating tasks
//routers/task.js
router.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const task = await Task.findById(req.params.id)

        updates.forEach((update) => task[update] = req.body[update])    //assign the updated task
        await task.save()       //save the updated task, here is where our middleware would get executed

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})
