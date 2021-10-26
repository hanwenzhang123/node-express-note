//JSON Web Tokens(JWT) 
- generate a authentication tokens and validate them, make sure they are still valid, not expired.
- you can set how long you want to token to be expired or not, and check if the token access for the user has expired
https://www.npmjs.com/package/jsonwebtoken
npm i jsonwebtoken

json web token separated with 3 parts by the period
1st (header) - base 64 encoded json string - type of JWT and the algorithm that was used to generate it.
2nd (payload or body) - base 64 encoded JSON string - contains the data that we provided, which in our case would be the ID we provided
3nd (signature) - used to verify the token later on.

The purpose of JWT is to create data that is verifiable via signature

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

const jwt = require('jsonwebtoken')   //require the npm library

//create an auth token, we will use .sign(), return value will be new auth token, will be applied to the client
//.sign() takes 2 arguments, 1st object that embeded in the token, an unique identifier
//2nd a random secret string, any series of charaters will work
//3rd optional, an object that we can customize with some option, like how long you want the token will be valid

//verify the token using .verify(), 1st the token you try to verify, 2nd is the secrete string
//return our data back if secret is correct, otherwise, error thrown

const myFunction = async () => {
    const token = jwt.sign({ _id: 'abc123' }, 'thisismynewcourse', { expiresIn: '7 days' })
    console.log(token)

    const data = jwt.verify(token, 'thisismynewcourse') 
    console.log(data)
}

myFunction()


//Generating Authentication Tokens
//routers/user.js
const express = require('express')
const User = require('../models/user')
const router = new express.Router()

router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()   //generate the token after the user has saved, and we get the token back from the async function using await
        res.status(201).send({ user, token })       //send back an object with both user and token
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()  //get the token, generateAuthToken() to get the token back, name is named by our own in models/user.js
        res.send({ user, token })   //send back object with two properties, user and token
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

router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const user = await User.findById(req.params.id)

        updates.forEach((update) => user[update] = req.body[update])
        await user.save()

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


//models/user.js
const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken') //import the library

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
    tokens: [{    //add the token field
        token: {
            type: String,
            required: true
        }
    }]
})

//ALL reusbale functions that you can use in the route files
userSchema.methods.generateAuthToken = async function () {    //create the generateAuthToken methods (instance method, available in instances)
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'thisismynewcourse')   //create token: provide payload (uniquely identifier the user) and secret string

    user.tokens = user.tokens.concat({ token }) //concating the new item (the generated token) with the object onto the existing array to the user
    await user.save()   //save the token to the database

    return token    //return the token
}

userSchema.statics.findByCredentials = async (email, password) => { //statics are static method - accessible on the model
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
