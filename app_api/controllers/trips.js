const mongoose = require('mongoose');
const Trip = require ('../models/travlr'); //Register model
const Model = mongoose.model('trips');

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

module.exports = {
    tripsList,
    tripsFindByCode
};