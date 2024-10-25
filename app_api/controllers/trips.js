const mongoose = require('mongoose');
const Trip = require ('../models/travlr'); //Register model
require('../models/users');
const Model = mongoose.model('trips');
const User = mongoose.model('users');

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.payload._id);
        if (!user) {
            return res.status(404).json({ "message": "User not found" });
        }
        return user;
    } catch (err) {
        return res.status(400).json(err);
    }
};
        //}
    //}
    //if (req.payload && req.payload.email) {            
        //User
            //.findOne({ email : req.payload.email })         
            //.exec((err, user) => {
                //if (!user) {
                    //return res
                        //.status(404)
                        //.json({"message": "User not found"});
                //} else if (err) {
                    //console.log(err);
                    //return res
                        //.status(404)
                        //.json(err);
                //}
                //callback(req, res, user.name);                
            //});
    //} else {
        //return res
            //.status(404)
            //.json({"message": "User not found"});
    //}
//};

// GET: /trips - list all the trips
// Response must include HTML status code and Json message
const tripsList = async (req, res) => {
    const q = await Model
        .find({}) // No filter, return all records
        .exec();

        //console.log(q)

    if (!q) {
        return res
                .status(404)
                .json(err);
    } 
    else {
        return res  
            .status(200)
            .json(q)
    }

};

// GET: /trips/:tripCode - list a single trip
// Response must include HTML status code and Json message
const tripsFindByCode = async (req, res) => {
    const q = await Model
        .find({'code' : req.params.tripCode}) // No filter, return all records
        .exec();

        //console.log(q)

    if (!q) {
        return res
                .status(404)
                .json(err);
    } 
    else {
        return res  
            .status(200)
            .json(q)
    }

};

//Post new trips
const tripsAddTrip = async (req, res) => {
    getUser(req, res, (user) => { 
            Trip
                .create({
                    code: req.body.code, 
                    name: req.body.name,
                    tripLength: req.body.tripLength, 
                    start: req.body.start,
                    resort: req.body.resort,
                    perPerson: req.body.perPerson,
                    image: req.body.image,
                    description: req.body.description
                },
                (err, trip) => {
                    if (err) {
                        return res
                            .status(400) // bad request
                            .json(err);
                    } else {
                        return res  
                            .status(201) //created
                            .status(trip);
                    }
                });
        }
    );
};

// PUT: /trips/:tripCode - Updates an existing Trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsUpdateTrip = async (req, res) => {
    getUser(req, res,
        (req, res) => {
            Trip
                .findOneAndUpdate({'code': req.params.tripCode },{
                    code: req.body.code,
                    name: req.body.name,
                    length: req.body.tripLength,
                    start: req.body.start,
                    resort: req.body.resort,
                    perPerson: req.body.perPerson,
                    image: req.body.image,
                    description: req.body.description
                }, { new: true })
                .then(trip => {
                    if (!trip) {
                        return res
                            .status(404)
                            .send({
                                message: "Trip not found with code" + req.params.tripCode
                            });
                    }
                    res.send(trip);
                }).catch(err => {
                    if (err.kind === 'ObjectId') {
                        return res
                            .status(404)
                            .send({
                                message: "Trip not found with code" + req.params.tripCode
                            });
                    }
                    return res
                        .status(500) // server error
                        .json(err);
                });
        }
    );
} 

// Delete trip
const tripDeleteTrip = async (req, res) => {
    const tripCode = req.params.tripCode;

    try {
        const deletedTrip = await Model.findOneAndDelete({ code: tripCode }); // Find and delete the trip by code

        if (!deletedTrip) {
            // If no trip found, return 404
            return res.status(404).json({ message: 'Trip not found' });
        }

        // Successfully deleted, return a success message
        return res.status(200).json({ message: 'Trip deleted successfully' });
    } catch (err) {
        // Catch any errors and return a 500 status with error details
        return res.status(500).json({ error: err.message });
    }
};

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip,
    tripDeleteTrip
};