const bcrypt = require('bcrypt');
const express = require('express');
const DB = require('../config/mysql.js');


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
    let error = {}
  
    if (!req.body.email || !req.body.pwd) errorOn = true;
  
    !req.body.email ? error.email  = "Field email is required" : '';
    !req.body.pwd ? error.password = "Field password is required" : '';
  
    if (errorOn) {return res.status(400).json(error)}

    let sql = `SELECT pwd FROM users WHERE email LIKE '${req.body.email}';`

    DB.query(sql, (err, result) => {
        if (result.length < 1) {
            return res.status(400).json({error: "No account associated with the email!"})
        }
        if (err) throw err.message;
        let resu = JSON.parse(JSON.stringify(result[0]));

        bcrypt.compare(req.body.pwd, resu.pwd)
        .then(resultHash => {

            // Handle the result of comparing submited password to stored one.
            if (!resultHash) {
                return res.status(401).json({error: "Passwords don't match to this account!"})
            } 
            next();
        })
        .catch(err => {
            throw err;
        })
    })
}


module.exports = checkLoginPassword;

