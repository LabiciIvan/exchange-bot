const express = require('express');
const DB = require('../config/mysql.js');


/**
 * @author Ioan Labici <labici.ioan@yahoo.com>
 * Checks if the account exists, by running a query based
 * on he email submited in the POST request to the server.
 * The function runs the query and if result is bigger the 0
 * then we assume email is take.
 */
const checkAccountExists = (req, res, next) => {

    const str = `SELECT * FROM users WHERE email LIKE '${req.body.email}';`;

    DB.query(str, (err, result) => {
        
        if (err) {throw err.message; } else {

            let resultQuery = JSON.parse(JSON.stringify(result));

            if (resultQuery.length > 0) {

                res.status(200);
                return res.send({error : "This email is already taken!"});

            } else {

                next();
            }
        }
    });
}

module.exports = checkAccountExists;

