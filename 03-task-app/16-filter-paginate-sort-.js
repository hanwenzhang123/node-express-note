//Working with Timestamps
//src/models/task.js
const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({    //give a second argument to set the timestamps to true
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {    //set timestamps: true
    timestamps: true
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task


// Filtering Data
// Paginating Data
// Sorting Data
//src/routers/task.js
const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

// GET /tasks?completed=true
// GET /tasks?limit=10&skip=0
// GET /tasks?sortBy=createdAt:desc
router.get('/tasks', auth, async (req, res) => {        //sending back an array of data (can be huge)
    const match = {}    //an object like set {complete: true}
    const sort = {}

    if (req.query.completed) {
        match.completed = req.query.completed === 'true'  //get the ones completed is true
    }

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')   //createdAt:desc
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1   //sort = {createdAt: -1 || createdAt: 1}
    }

    try {
        await req.user.populate({   //limit what data to get back 
            path: 'tasks',
            match,      //match: match, the obj we set above
            options: {
                limit: parseInt(req.query.limit),   //set the limit
                skip: parseInt(req.query.skip),     //set the skip
                sort      //sort: sort, the obj we set above
            }
        }).execPopulate()
        res.send(req.user.tasks)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findOne({ _id, owner: req.user._id })

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id})

        if (!task) {
            return res.status(404).send()
        }

        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

        if (!task) {
            res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router
