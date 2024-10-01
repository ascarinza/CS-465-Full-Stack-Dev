//Bring in the DB connection and the Trip Schema
const Mongoose = require('./db');
const Trip = require('./travlr');

// Read seed data from json file
var fs = require('fs')
var trips = JSON.parse(fs.readFileSync('./app_server/data/trips.json', 'utf8'));

// Delete any existing recors, then insert seed data
const seedDB = async () => {
    await Trip.deleteMany({});
    await Trip.insertMany(trips);
};

// Close the MongoDB connection and exit
seedDB().then(async () => {
    await Mongoose.connection.close();
    process.exit(0)
});

