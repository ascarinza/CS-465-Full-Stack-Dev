const express = require('express');
const router = express.Router();
const { expressjwt: jwt }  = require('express-jwt')

const auth = jwt({ // Create the auth middleware
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    requestProperty: 'payload' 
});

// imported controller to route
const tripsController = require('../controllers/trips');

//Import Authenticaion controller
const authController = require('../controllers/authentication');

// Define routes for log in
router  
    .route('/login')
    .post(authController.login);

// Define routes for register 
router      
    .route('/register')
    .post(authController.register);

// Define route for trips endpoint
router
    .route('/trips')
    .get(tripsController.tripsList)
    .post(auth, tripsController.tripsAddTrip);


// Define route for tripsFindByCode endpoint
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(auth, tripsController.tripsUpdateTrip)
    .delete(auth, tripsController.tripDeleteTrip);


module.exports = router;
