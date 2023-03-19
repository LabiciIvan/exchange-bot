const bcrypt = require('bcrypt');
const express = require('express');
const DB = require('../../config/mysql.js');


/**
 * @author Ioan Labici <labici.ioan@yahoo.com>
 * 
 * Checks if submited password matches the one from DB.
 */
const login = (req, res, next) => {

    let error = {status: '', message: {email: '', pwd: ''}}
  
    if (!req.body.email || !req.body.pwd) error.status = 'failed';
  
    if (!req.body.email) error.message.email  = 'Field email is required';
    if (!req.body.pwd) error.message.pwd = 'Field password is required';
  
    if (error.status === 'failed') {return res.status(400).json(error)}

    let sql = 'SELECT pwd FROM users WHERE email = ?';

    DB.query(sql, [req.body.email], (err, result) => {
        if (result.length < 1) {
            return res.status(400).json({status: 'failed', message: 'No account associated with the email!'})
        }
        if (err) throw err.message;
        let resu = JSON.parse(JSON.stringify(result[0]));

        bcrypt.compare(req.body.pwd, resu.pwd)
        .then(resultHash => {

            // Handle the result of comparing submited password to stored one.
            if (!resultHash) {
                return res.status(401).json({status: 'failed', message: 'Passwords don/\'t match to this account!'})
            } 
            next();
        })
        .catch(err => {
            throw err;
        })
    })
}


module.exports = login;

