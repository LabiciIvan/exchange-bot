const bcrypt = require('bcrypt');
const Validator = require('../Validator');
const DB = require('../../config/mysql.js');


/**
 * @author Ioan Labici <labici.ioan@yahoo.com>
 * 
 * Checks if submited password matches the one from DB.
 */
const login = (req, res, next) => {
    // Declare rules for Validator.
    const rules = {
        email: 'required|email|max:30',
        password: 'required',
    }

    // Declare values for Validator.
    const values = {
        email: req.body.email,
        password: req.body.pwd,
    }

    // Instantiate a new object to use validator class.
    const Validate = new Validator(rules, values);
    
    // Ask Validator to check for errors.
    Validate.check()
        .then(() => {
            // Successful validation, continue with custom validation.
            let sql = 'SELECT pwd FROM users WHERE email = ?';

            // Custom validation.
            DB.query(sql, [req.body.email], (err, result) => {
                if (result.length < 1) {
                    return res.status(400).send({status: 'fail', email: ["No account associated with the email!"]})
                }
                if (err) throw err.message;
                let resu = JSON.parse(JSON.stringify(result[0]));
        
                bcrypt.compare(req.body.pwd, resu.pwd)
                .then(resultHash => {
        
                    // Handle the result of comparing submited password to stored one.
                    if (!resultHash) {
                        return res.status(401).send({status: 'fail', email: ["Passwords don't match to this account!"]})
                    } 
                    next();
                })
                .catch(err => {
                    throw err;
                });
            });
        })
        .catch(err => {
            // Unsuccessful validation send errors to frontend.
            return res.status(400).json(err);
        });
}

module.exports = login;