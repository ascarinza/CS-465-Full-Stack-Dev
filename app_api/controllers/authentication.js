const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('users');

const register = async (req, res) => {
    console.log('Register request received:', req.body); // Log incoming request

    // Check if all required fields are present
    if (!req.body.name || !req.body.email || !req.body.password) {
        console.log('Missing required fields');
        return res.status(400).json({ "message": "All fields required" });
    }

    try  {
        const user = new User();
        user.name = req.body.name;
        user.email = req.body.email;
        user.setPassword(req.body.password);

        await user.save();

        const token = user.generateJwt();
        res.status(200).json({token})

    } catch (err) {
        res.status(400).json(err); // Handle errors
    }
};

    //try {
        //user.setPassword(req.body.password); // Assuming this is your method to hash the password
        //console.log('Password has been set');
    //} catch (error) {
        //console.log('Error setting password:', error);
        //return res.status(500).json({ "message": "Error setting password" });
    //}

    //user.save((err, savedUser) => {
        //if (err) {
            //console.log('Error saving user:', err);
            //return res.status(400).json(err);
        //} else {
            //console.log('User saved successfully:', savedUser);

            // Generate JWT after successful save
            //try {
                //const token = savedUser.generateJwt(); // Ensure this method works
                //console.log('JWT generated:', token);
                //return res.status(200).json({ token });
            //} catch (tokenError) {
                //console.log('Error generating token:', tokenError);
                //return res.status(500).json({ "message": "Error generating token" });
            //}
        //}
    //});
//};

const login = async (req, res) => {
    console.log("Login request received:", req.body)

    if (!req.body.email || !req.body.password) {
        return res
            .status(400)
            .json({"message": "All fields required"});
    }

    try{
        const user = await User.findOne({email: req.body.email})
        
        if (!user || !user.validPassword(req.body.password)) {
            return res.status(401).json({ "message": "Invalid email or password" })
        }

        const token = user.generateJwt();
        res.status(200).json({token})
    }

    catch (err) {
        res.status(400).json(err);
    }

    //passport.authenticate('local', (err, user, info) => {
        //console.log("Authentication callback reached.");

        //if (err) {
            //return res
                //.status(404)
                //.json(err);
        //}
        //if (user) {
            //const token = user.generateJwt();
            //console.log("Generated token:", token);
            //res
                //.status(200)
                //.json({token});
        //} else {
            //res
                //.status(401)
                //.json(info);
        //}
    //})(req, res);
};

module.exports = {
    register, 
    login
};
