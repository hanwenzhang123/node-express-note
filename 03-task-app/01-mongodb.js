SQL vs NoSQL
Table vs Collection
Row/Record vs Document
Column vs Field

https://www.mongodb.com/try/download/community
/Users/{yourname}/Documents/mongodb/bin/mongod --dbpath=/Users/{yourname}/Documents/mongodb-data

https://docs.mongodb.com/manual/reference/method/
- MongoDB methods

//Connecting and Inserting Documents
    - CRUD create read update delete

//mongodb.js
const mongodb = require('mongodb')    //import the module, will come back as an object
const MongoClient = mongodb.MongoClient //we need to initialize the mongodb client, gives us access to the function necessary to connect to the database

const connectionURL = 'mongodb://127.0.0.1:27017'   //define the connection URL, connect the database url in a string with full IP address(localhost: 27017)
const databaseName = 'task-manager'   //the name for the database, we can customize our own database name

//connect() takes argument to set up the connection, 1st connection URL, 2nd option object, 3rd callback function when we connect to the database (asyn operation)
MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => { //error displays error message and client connects to db correctly
    if (error) {        //if error occurs
        return console.log('Unable to connect to database!')
    }

    const db = client.db(databaseName)      //reference to the specific database we want to connect to, then we can manipulate that db
    
    db.collection('users').insertOne({      //need db reference, collection like tables, inset data, will receive unique _id identifier for each data set
        name: 'Andrew',
        age: 27
     }), (error, result) => {       //second argument as another callback to handle error or print out saved data
         if (error) {
             return console.log('Unable to insert user')
         }

         console.log(result.ops)        //ops -> all the document that we inserted in array format with documents inside, check result
     })

     db.collection('users').insertMany([        //db for initialization indicating which collection, insert many with objects in an array
         {
             name: 'Jen',
             age: 28
         }, {
             name: 'Gunther',
             age: 27
         }
     ], (error, result) => {
         if (error) {       //check if error, and if there is an error
             return console.log('Unable to insert documents!')      //return stops function execution
         }

         console.log(result.ops)        //pass the error handling then we can print out the result
     })

    db.collection('tasks').insertMany([
        {
            description: 'Clean the house',
            completed: true
        },{
            description: 'Renew inspection',
            completed: false
        },{
            description: 'Pot plants',
            completed: false
        }
    ], (error, result) => {
        if (error) {
            return console.log('Unable to insert tasks!')
        }

        console.log(result.ops)
    })
})
  
