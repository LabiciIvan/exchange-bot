require('dotenv').config();
const jwt = require('jsonwebtoken');


/**
 * @author Ioan Labici <labici.ioan@yahoo.com>
 * 
 * Check if the token is present and not expired this
 * would be the user logged in.
 */
const verifyJWT = (req, res, next) => {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (authHeader === undefined) {
        return res.status(401).json({status: 'error', message: 'Sorry, your login token not present!'});
    } 

    // Verify if the token isn't expired or malformed.
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err)  {  
            // Token expired || malformed.
            return res.status(403).json({status: 'error', message: 'Sorry, your login token has expired!'});
        } 
        else
        {   // Everything went well proceed further.
            next();
        }
    });
}


module.exports = verifyJWT;