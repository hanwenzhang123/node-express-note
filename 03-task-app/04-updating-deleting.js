// CRUD create read update delete

const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')
    }

    const db = client.db(databaseName)
    
    db.collection('users').updateOne({       //1st argument - an object with search cretaria
        _id: new ObjectID("5c0fe6634362c1fb75b9d6b5")
    }, {                                     //2nd argument - how you want to update the information
        $inc: {     //$inc - inccrement a number
            age: 1
        }
    }).then((result) => {       //then when promise fulfilled
        console.log(result)
    }).catch((error) => {       //catch when promise rejected
        console.log(error)
    })

    db.collection('tasks').updateMany({     //update all data fit the search cretaria
        completed: false
    }, {
        $set: {     //$set - to change the selected object field valuue
            completed: true
        }
    }).then((result) => {
        console.log(result.modifiedCount)
    }).catch((error) => {
        console.log(error)
    })
})


// CRUD create read update delete

const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')
    }

    const db = client.db(databaseName)
    
    db.collection('users').deleteMany({     //just provide the search cretaria to the items you want to delete
        age: 27
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })

    db.collection('tasks').deleteOne({      //only detele one individual element
        description: "Clean the house"
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })
})
