//purpose of this file: want to read from db.json and write to db.json

const router = require('express').Router();
const fs = require('fs');
let database = require('../../db/db.json');

router.get('/notes', (req, res) => {
    database = JSON.parse(fs.readFileSync('./db/db.json', 'UTF-8'))
    res.json(database)
});

//request to be able to post a note
router.post('/notes', (req, res) => {
    //create a model/template for what can go into database
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
router.delete('/notes/:id', (req, res) => {
    //create for loop that iterates over all notes and if it's not the id of the one we want to remove, we push it to a new array. 
    //set new array equeal to database so it becomes the new database. rewrite new updated database
    let keep = []
    for (var i = 0; i < database.length; i++) {
        if (database[i].id != req.params.id) {
            keep.push(database[i])
        }
    }
    database = keep;
    fs.writeFileSync('./db/db.json', JSON.stringify(database))

    //send response
    res.json(database)
});

module.exports = router;