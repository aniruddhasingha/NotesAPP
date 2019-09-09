const express = require('express')
const mongo = require("./mongodb")
const app = express()
//Specifying the PORT address
app.use(express.json())
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`listening on port ${port}`)
})
//Read data
app.get('/notes/read/:refId', (req, res) => {
    const refId = req.params
    mongo.readNote(req.params.refId).then((result) => {
        res.send(result)
    })
})
//Delete data
app.delete('/notes/delete/:refId', (req, res) => {
    mongo.deleteNote(req.params.refId).then((result) => {
        res.send(result)
    })

})
//Create data
app.post('/notes/create/postNotes', (req, res) => {

    mongo.createNote(req.body.refId, req.body.content).then((result) => {
        res.send(result)
    })

})
//Update data
app.post('/notes/update/postUpdate', (req, res) => {
    mongo.updateNote(req.body.refId, req.body.content).then((result) => {
        res.send(result)
    })

})




