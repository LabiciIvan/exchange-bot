const jwt = require('jsonwebtoken');

/**
 * Returns the encoded jwt token.
 * 
 * @function DecodeToken
 * @param {string} reqHeadersAuthorization - the actual req.headers['authorizaion']
 * @returns {Promise} decoded token if is valid, null otherwise.
 */
const DecodeToken = (reqHeadersAuthorization) => {
    return new Promise((resolve, reject) => {

        // Split the token and get the second value, the actual encoded token.
        const token = reqHeadersAuthorization && reqHeadersAuthorization.split(' ')[1];

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
            // if error the token expired or invalid.
            if (err) 
            {
                console.log('TOKEN EXP');
                reject(null);
            } 
            else 
            {
                resolve(decodedToken);
            }
        });
    });
}

module.exports = DecodeToken;