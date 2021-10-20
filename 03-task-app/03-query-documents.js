//Querying Documents - READ
https://mongodb.github.io/node-mongodb-native/3.1/api/Collection.html
findone - find individual data
find - the data meet the cretaria

//mongodb.js
const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')
    }

    const db = client.db(databaseName)
    
    //findOne requires 2 arguments 
    //1st an object for search cretaria (the value we are looking for)
    //2nd callback function is called when operation completes - user here will the data meets the search
    //if the cretaria meets multiple data, it will only grab the first one
    
    db.collection('users').findOne({ _id: new ObjectID("5c1113239cbfe605241f9071") }, (error, user) => {    
        //if we search by id, because id is not string, it is binary data. 
        //we have to provide ObjectID by using new ObjectID("") with the id passing in
        if (error) {
            return console.log('Unable to fetch')
        }

        console.log(user)
    })

    //find returns a cursor, return a array of the documents the database points to
    //find requires 2 arguments 
    //1st an object for search cretaria (return all the values we are looking for that meet the cretaria)
    //2nd callback function, once we get the data or not, what to do afterwards
    
    db.collection('users').find({ age: 27 }).toArray((error, users) => {
        console.log(users)      //if we want to read, use toArray() and pass the callback in
    })
    
    db.collection('users').find({ age: 27 }).count(error, count) => {
        console.log(count)      //return number of how many data meets the cretaria
    })

    db.collection('tasks').findOne({ _id: new ObjectID("5c0fec243ef6bdfbe1d62e2f") }, (error, task) => {
        console.log(task)
    })

    db.collection('tasks').find({ completed: false }).toArray((error, tasks) => {
        console.log(tasks)
    })
})
 
