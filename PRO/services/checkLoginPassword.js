const bcrypt = require('bcrypt');
const express = require('express');
const database = require('../config/mysql.js');


/**
 * @author Ioan Labici <labici.ioan@yahoo.com>
 * 
 *  Checks if the email, pwd are present, if not it will throw error with status 400,
 * if fields are present it will query the DATABASE 'password' for submited 'email' field, if
 * there are no results it will send error, if there is result it will compare submited 'password'
 * with the password returned from DATABASE, if everything is it will go to next middleware, if not 
 * it will throw an error.
 */
async function checkLoginPassword(req, res, next) {

    let errorOn = false;
    let error = [];
  
    if (!req.body.email || !req.body.pwd) errorOn = true;
  
    !req.body.email ? error.push({email: "Field email is required"}) : '';
    !req.body.pwd ? error.push({password: "Field password is required"}) : '';
  
    if (errorOn) {return res.status(400).send({error})}

    let sql = `SELECT pwd FROM users WHERE email LIKE '${req.body.email}';`

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
                return res.status(401).send({error: "Passwords don't match to this account!"})
            } 
            next();
        })
        .catch(err => {
            throw err;
        })
    })
}


module.exports = checkLoginPassword;

