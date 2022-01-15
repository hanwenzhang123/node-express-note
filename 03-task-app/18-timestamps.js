//Working with Timestamps
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
}, {  
    timestamps: true
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task
