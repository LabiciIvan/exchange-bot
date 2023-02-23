var express = require('express');
const database = require('../config/mysql.js');

/**
 * This middleware will look for a user in the DB
 * associated with email sent in the request body.
 * If there are NO results then it will to to next, otherwise
 * if will send a message saying this email is take.
 */
const searchUser = (req, res, next) => {

    const queryStr = `SELECT * FROM users WHERE email LIKE '%${req.body.email}%';`;

    database.query(queryStr, (err, result) => {
        
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

module.exports = searchUser;

