// Resource Updating Endpoints
// Resource Deleting Endpoints

//src/index.js
const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())     //for create and update

app.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

app.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (e) {
        res.status(500).send()
    }
})

app.get('/users/:id', async (req, res) => {
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

app.patch('/users/:id', async (req, res) => {     //updating, mongodb will ignore the data if the key is not set in model
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age'] //what we allow to update, not things like id
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update)) //returns true if all elements in an array "updates" pass the includes test

    if (!isValidOperation) {    //error handling for valid operation
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {    //findByIdAndUpdate() - 1st: the id you want to update, 2nd: the object we update to, req.body is what we created through HTTP request
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })  //3rd option object
    
        if (!user) {
            return res.status(404).send()
        }

        res.send(user)      //send back with the update applied
    } catch (e) {    //wrong when something goes wrong, like validation
        res.status(400).send(e)  //send back the error object
    }   
})

app.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)    //store the user we are going to delete

        if (!user) {     //if there is no such a user
            return res.status(404).send()
        }

        res.send(user)  //send the user we try to delete
    } catch (e) {
        res.status(500).send()
    }
})

app.post('/tasks', async (req, res) => {
    const task = new Task(req.body)

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (e) {
        res.status(500).send()
    }
})

app.get('/tasks/:id', async (req, res) => { //just id is enough to delete the data
    const _id = req.params.id       //get the id

    try {
        const task = await Task.findById(_id)

        if (!task) {    //if there is no such a task
            return res.status(404).send()
        }

        res.send(task)  //send the task we try to delete
    } catch (e) {
        res.status(500).send()
    }
})

app.patch('/tasks/:id', async (req, res) => {   //updating the task by its id
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update)) //for each individual update is included in the array

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {   //findByIdAndUpdate() - 1st: the id you want to update, 2nd: the object we update to, req.body - the data will be pass in through the http request
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true})   //3rd option object

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)  //send back with the updated task body
    } catch (e) {
        res.status(400).send(e)
    }
})

app.delete('/tasks/:id', async (req, res) => {  //just id is enough to delete the data
    try {
        const task = await Task.findByIdAndDelete(req.params.id)

        if (!task) {
            res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

//src/db/mongoose.js
const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})
