const jwt = require('jsonwebtoken');


/**
 * 
 * @param {jwt} token - The JWT token to decode.
 * @returns {object|null} - The decoded JWT token or null if token is invalid.
 */
const decodeJWT = (token) => {
    
    const tokenDecoded = jwt.decode(token);

    return tokenDecoded;
}

module.exports = decodeJWT;