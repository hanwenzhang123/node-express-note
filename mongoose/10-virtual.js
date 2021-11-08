//virtual is not exist in the database but only in mongoose
//we can reset the value of the person using set, see documentation for details

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/shopApp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO ERROR!!!!")
        console.log(err)
    })

const personSchema = new mongoose.Schema({
    first: String,
    last: String
})

personSchema.virtual('fullName').get(function () {      //define virtual, here is .fullname
    return `${this.first} ${this.last}`
})

const Person = mongoose.model('Person', personSchema);      //model

  
