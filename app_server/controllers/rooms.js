var fs = require('fs')
var rooms = JSON.parse(fs.readFileSync('./data/rooms.json', 'utf8'))

/* Get travel view */
const rooms = (req, res) => {
    res.render('rooms', { title : 'Travelr Getaways', rooms});
};

module.exports = {
    rooms
};