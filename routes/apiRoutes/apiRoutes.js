//for this file we want to read from db.json and write to db.json

const router = require('express').Router();
const fs = require('fs');
let database = require('../../db/db.json');

//when we put data into db.json we need to stringify; when we pull it out we need to parse. like localstorage
router.get('/notes', (req, res) => {
    //this fires in server.js and that's why the path below is the relative path from server.js 
    database = JSON.parse(fs.readFileSync('./db/db.json', 'UTF-8'))
    //when doing res with express it has to be lowercase...weird
    res.json(database)
});

//request to be able to post a note
router.post('/notes', (req, res) => {
    //create a model/template for waht can go into database
    let noteModel = {
        title: req.body.title,
        text: req.body.text,
        id: Math.floor(Math.random()* 100)
    }
    database.push(noteModel)
    //pushing to database (array) and rewriting and stringifying it.
    fs.writeFileSync('./db/db.json', JSON.stringify(database))

    //send response
    res.json(database)
});

//delete notes
//whenever you see :id - think req.params.id
router.delete('/notes/:id', (req, res) => {
    
})

module.exports = router;