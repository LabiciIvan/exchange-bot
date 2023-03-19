const bcrypt = require('bcrypt');

/**
 * Async Middleware function, it will hash the given password
 * and assign the new HASH password value to the given password 
 * using bcrypt 5.1.0 library .
 */
const hashPWD = async (req, res, next) => {
    try {
        req.body.pwd = await bcrypt.hash(req.body.pwd, 10);
    } catch (err) {
        throw err;
    }
    next();
}

module.exports = hashPWD;