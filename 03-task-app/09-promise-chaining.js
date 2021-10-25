//https://mongoosejs.com/docs/queries.html
- Model.findByIdAndUpdate() - 1st arg: id, 2nd arg: the update want to apply
- .findByIdAndDelete() - pass in ID that you want to delete
- .countDocuments() - count the number of the document, accept an object that we provide a filter
    
//promise-chaining.js
require('../src/db/mongoose')
const User = require('../src/models/user')

User.findByIdAndUpdate('5c1a5a34d5a2ec046ca8f6bc', { age: 1 }).then((user) => { //run code when we find the item
    console.log(user)       //print the updated document
    return User.countDocuments({ age: 1 })
}).then((result) => {       //get access to the result
    console.log(result)
}).catch((e) => {
    console.log(e)
})

const updateAgeAndCount = async (id, age) => {  //we start with async function
    const user = await User.findByIdAndUpdate(id, { age })  //update the age
    const count = await User.countDocuments({ age })
    return count        //return how many with that age
}

updateAgeAndCount('5c1a5a34d5a2ec046ca8f6bc', 2).then((count) => {  //call the function
    console.log(count)  //print the result, which will be the count returned from the updateAgeAndCount()
}).catch((e) => {
    console.log(e)
})


//promise-chaining-2.js
require('../src/db/mongoose')
const Task = require('../src/models/task')

Task.findByIdAndDelete('5c1a63e8f0d4c50656c5ab28').then((task) => {
    console.log(task)   //print the deleted document
    return Task.countDocuments({ completed: false })    //return the result of count how many data with { completed: false } in our current db
}).then((result) => {   //count operation is done
    console.log(result)
}).catch((e) => {
    console.log(e)
})

const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ completed: false })
    return count
}

deleteTaskAndCount('5c1a634150c97706427d4661').then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})
  
