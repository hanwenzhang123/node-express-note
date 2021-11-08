//Middleware (also called pre and post hooks) are functions which are passed control during execution of asynchronous functions. 
//https://mongoosejs.com/docs/middleware.html

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/shopApp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO ERROR!!!!")
        console.log(err)
    })

const personSchema = new mongoose.Schema({    //schema
    first: String,
    last: String
})
personSchema.pre('save', async function () {        //pre works as before save here, run some code before it saved
    this.first = 'YO';
    this.last = 'MAMA';
    console.log("ABOUT TO SAVE!!!!")
})
personSchema.post('save', async function () {       //post works as after {save} here, depends on what type of the middleware in first param
    console.log("JUST SAVED!!!!")
})

const Person = mongoose.model('Person', personSchema);      //set model


//Types of Middleware
validate
save
remove
updateOne
deleteOne
init (note: init hooks are synchronous)
