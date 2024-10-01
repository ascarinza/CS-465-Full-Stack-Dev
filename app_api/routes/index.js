const express = require('express');
const router = express.Router();

// imported controller to route
const tripsController = require('../controllers/trips');

// Define route for trips endpoint
router
    .route('/trips')
    .get(tripsController.tripsList);


// Define route for tripsFindByCode endpoint
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode);


module.exports = router;
