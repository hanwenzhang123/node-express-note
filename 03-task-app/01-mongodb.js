SQL vs NoSQL
Table vs Collection
Row/Record vs Document
Column vs Field

https://www.mongodb.com/try/download/community
/Users/{yourname}/Documents/mongodb/bin/mongod --dbpath=/Users/{yourname}/Documents/mongodb-data


//mongodb.js
//Connecting and Inserting Documents - CRUD create read update delete
const mongodb = require('mongodb')    //import the module, will come back as an object
const MongoClient = mongodb.MongoClient //we need to initialize the mongodb connection, gives us access to the function necessary to connect to the database

const connectionURL = 'mongodb://127.0.0.1:27017'   //connect the database url in a string with full IP address
const databaseName = 'task-manager'   //the name for the database

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {  //connect(), 1st URL, 2nd option object, 3rd
    if (error) {
        return console.log('Unable to connect to database!')
    }

    const db = client.db(databaseName)
    
    db.collection('users').insertOne({
        name: 'Andrew',
        age: 27
    })
})
