const {
    MongoClient,
    ObjectID
} = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'
let db

MongoClient.connect(connectionURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (error, client) => {
    if (error) {
        return console.log("Unable to connect to database!")
    }
    db = client.db(databaseName)
})
//Function to  read note from dataBase
function readNote(refId) {
    let query = {
        refId: refId
    }
    return db.collection('tasks').find(query).toArray().then((result) => {
        return result
    })
}
//Function to delete read note from dataBase
function deleteNote(refId) {
    let query = {
        refId: refId
    }
    return db.collection('tasks').deleteOne(query).then((result) => {
        return true
    }).catch((error) => {
        return false
    })
}
//Function to create note from dataBase
function createNote(refId, content) {
    return db.collection('tasks').insertOne({
        refId: refId,
        content: content
    }).then((result) => {
        return result.ops
    })
}
//Function to update note from dataBase
function updateNote(refId, content) {
    return db.collection('tasks').updateOne({
        refId: refId
    }, {
            $set: {
                content: content
            }
        }).then((result) => {
            return true
        })
}
//exporting function to server.js
module.exports = {
    readNote, deleteNote, createNote, updateNote
}