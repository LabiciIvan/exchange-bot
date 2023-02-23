const express = require('express');
const bcrypt = require('bcrypt');

const database = require('../config/mysql');

/**
 * 
 * Middleware that will compare submited password 
 * to the password stored in the DB associated to the submited email in the request body.
 * If no email or password present in request body error is formated.
 * If no email associated to account it will format an error.
 * If password doesn't match, then it will format an error.
 */
async function comparePassword(req, res, next) {

    let errorOn = false;
    let error = [];
  
    if (!req.body.email || !req.body.pwd) errorOn = true;
  
    !req.body.email ? error.push({email: "Field email is required"}) : '';
    !req.body.pwd ? error.push({password: "Field password is required"}) : '';
  
    if (errorOn) {return res.status(400).send({error})}

    let sql = `SELECT pwd FROM users WHERE email LIKE '%${req.body.email}%';`

    database.query(sql, (err, result) => {
        if (!result.length > 0) {
            return res.status(400).send({error: "No account associated with the email!"})
        }
        if (err) throw err.message;
        let resu = JSON.parse(JSON.stringify(result[0]));

        bcrypt.compare(req.body.pwd, resu.pwd)
        .then(resultHash => {

            // Handle the result of comparing submited password to stored one.
            if (!resultHash) {
                return res.status(401).send({error: "Passwords don\/'t match to this account!"})
            } 
            next();
        })
        .catch(err => {
            throw err;
        })
    })
}


module.exports = comparePassword;