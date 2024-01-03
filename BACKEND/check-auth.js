//import the jsonwebtoken package
const jwt = require('jsonwebtoken');

//export a middleware function that checks for a valid token
module.exports = (req, res, next) => {
    try {
        // Get the token from the request header
        const token = req.headers.authorization.split(" ")[1];

        //verify the token
        req.userData = jwt.verify(token, "secret_this_should_be_longer_than_it_is");

        //call the next middleware function
        next();
    } catch (error) {
        res.status(401).json({
            message: "Invalid token"
        });
    }
};