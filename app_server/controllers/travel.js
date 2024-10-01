const tripEndpoint = http://localhost:3000/api/travel
const options = {
    method : 'GET',
    headers: {'Accept' : 'application/json'
    }
}

/* GET travel view*/
const travel = async function (req, res, next) {
    //console/log('Travel Controller begin');
    await fetch(tripsEndpoint, options)
        .then(res => res.json())
        .then(json => {
            //console.log(json);
            res.render('travel', {title : "Travlr Getaways", trips : json});
        })
        .catch(err => res.status(500).send(e.message));
    //console.log('Travel Controller After Render);
};

module.exports = {
    travel
};