const express = require('express');
const router = express.Router();

// imported controller to route
const tripsController = require('../controllers/trips');

// Define route for trips endpoint
router
    .route('/trips')
    .get(tripsController.tripsList)
    .post(tripsController.tripsAddTrip);


// Define route for tripsFindByCode endpoint
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(tripsController.tripsUpdateTrip)
    .delete(tripsController.tripDeleteTrip);


module.exports = router;
