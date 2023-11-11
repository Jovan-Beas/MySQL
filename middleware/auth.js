const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    try{
        //gets the token from the http header
        const token = req.header('auth-token');

        if(!token) 
        return res.status(401).json({
            success: 0,
            message: "Access denied"
        });

        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded.userData;
        next();
    }
    catch(error){
        return res.status(401).json({
            success: 0,
            message: "Authentication failed"
        });
    }
}