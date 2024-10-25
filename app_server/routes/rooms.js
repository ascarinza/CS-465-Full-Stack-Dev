const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

// Define the path to the JSON file
const roomsPath = path.join(__dirname, '..', 'data', 'rooms.json');

// Read and parse the JSON file
const rooms = JSON.parse(fs.readFileSync(roomsPath, 'utf8'));

/* Get rooms view */
router.get('/', (req, res) => {
    res.render('rooms', { title: 'Travelr Getaways', rooms });
});

module.exports = router;