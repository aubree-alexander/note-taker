const router = require('express').Router();
const path = require('path');

//join our html files to render at a specific endpoint
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/notes.html'))
});

//make index.html landing page
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'))
});

module.exports = router;