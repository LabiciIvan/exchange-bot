const bcrypt = require('bcrypt');
const express = require('express');
const DB = require('../../config/mysql.js');


/**
 * @author Ioan Labici <labici.ioan@yahoo.com>
 * 
 * Checks if submited password matches the one from DB.
 */
const login = (req, res, next) => {

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


module.exports = login;

