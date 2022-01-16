//middleware - customize the server to fit our needs
without middleware: new request -> run route handler
with middleware: new request -> do something -> run route handler //customize the behaviour of the server to fit our needs.
//this something is a function that runs and we can set up this function to do whatever we would like.

Register a new middleware function:  
app.use((req, res, next) => { next() })   //your job to call next() to have next thing run
//like if do something is the middleware, we do not call next(), then run route handler not going to run

app.use((req, res, next) => {
    console.log(req.method, req.path)
    next()  //let express know, done with middleware function
})

app.use((req, res, next) => {
    if (req.method === 'GET') {
        res.send('GET requests are disabled') //send back a response explaining why things are not working
    } else {
        next()  //from middleware goes to next
    }
})

app.use((req, res, next) => {   //maintainance mode with middleware, disable all kinds of requests, site is currently not available
    res.status(503).send('Site is currently down. Check back soon!') 
})


//Accepting Authentication Tokens using Middleware - auth-middleware
//instead of creating middleware in index.js, it is better to define it in a separate file so we can keep things nice and organized.
//src/middleware/auth.js - setup and define the authentication middleware
const jwt = require('jsonwebtoken')   //import jwtwebtoken so we can validate the token being provided
const User = require('../models/user')  //load the user model so we can find them in the database once we've validated the auth token

const auth = async (req, res, next) => {
    try {   //additional information to the server, goes to headr setup the key value pair
        const token = req.header('Authorization').replace('Bearer ', '')     //access incoming token header and replace
        const decoded = jwt.verify(token, 'thisismynewcourse')  //verify the token is correctly, user model where we create the token secret
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token }) //grab the user from the database, checks if it is part of token array - 'tokens.token': token 

        if (!user) { 
            throw new Error()   //throw error when the user not exist
        }
        
        req.token = token;
        req.user = user;     //store the existing user, easier to access to the data
        next()  //make sure the associated route handler to run
    } catch (e) {   //the user is not authenticated
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

module.exports = auth   //use this middleware elsewhere
 

//routers/user.js - set middleware in individual routes
const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')    //import the middleware to apply for the individual route
const router = new express.Router()

router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token }        //getting auto JSON.stringify() when we send
    } catch (e) {
        res.status(400).send()
    }
})

router.post('/users/logout', auth, async (req, res) => {    //with the authentication middleware
    try {
        req.user.tokens = req.user.tokens.filter((token) => {   //the token is the object with token property
            return token.token !== req.token   //when not the same, then true to log out
        })
        await req.user.save();
        
        res.send();
    } catch (e) {
        res.status(500).send();
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {        //log out all user sessions
    try {
        req.user.tokens = [];
        await req.user.save();
        
        res.send();
    } catch (e) {
        res.status(500).send();
    }
})

router.get('/users/me', auth, async (req, res) => {   //apply the middleware, before passing in the route handler
    res.send(req.user)
})

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
//         const user = await User.findById(req.params.id) - no longer need because we do not do '/users/:id anymore'

        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()

//         if (!user) {
//             return res.status(404).send()
//         }

        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/users/me', auth, async (req, res) => {
    try {
//         const user = await User.findByIdAndDelete(req.user._id) //we can do req.user._id because we have auth middlware

//         if (!user) {
//             return res.status(404).send()
//         }

        await req.user.remove();    //no needs above codes
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router

    
//src/models/user.js
const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
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
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

userSchema.methods.toJSON = function () {
  //hiding private user data, toJSON has to match, no needs to specifically call the method
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
}

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'thisismynewcourse')

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

// Hash the plain text password before saving
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
     
