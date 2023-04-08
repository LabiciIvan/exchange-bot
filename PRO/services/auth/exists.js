const express = require('express');
const DB = require('../../config/mysql.js');


/**
 * @author Ioan Labici <labici.ioan@yahoo.com>
 * Checks if the account exists, by running a query based
 * on the email submited in the POST request to the server.
 * The function runs the query and if result is bigger then 0
 * we assume email is taken.
 */
const exists = (req, res, next) => {

    const str = 'SELECT * FROM users WHERE email = ?';

    DB.query(str, [req.body.email], (err, result) => {
        
        if (err) {throw err.message; } else {

            let resultQuery = JSON.parse(JSON.stringify(result));

            if (resultQuery.length > 0) {

                return res.status(400).send({status: 'failed', email: ['This email is already taken!']});

            } else {

                next();
            }
        }
    });
}

module.exports = exists;

