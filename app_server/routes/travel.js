const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

// Define the path to the JSON file
const tripsPath = path.join(__dirname, '..', 'data', 'trips.json');

// Read and parse the JSON file
const trips = JSON.parse(fs.readFileSync(tripsPath, 'utf8'));

/* Get travel view */
router.get('/', (req, res) => {
    res.render('travel', { title: 'Travelr Getaways', trips });
});

module.exports = router;