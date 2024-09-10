/* GET Travel View*/
const travel = (req, res) => {
    console.log("Travel controller Invoked");
    res.render('travel', { title : "Travlr Getaways"});
};

module.exports =  { travel };