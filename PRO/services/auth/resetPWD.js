const moment = require('moment');
const express = require('express');
const jwt = require('jsonwebtoken');
const DB = require('../../config/mysql.js');



const resetPWD = (req, res, next) => {

    // Decode the token, after being verifyed by the main route /reset-password/verify/
    const data = jwt.decode(req.body.token);

    const CURRENT_DAY = moment().format("YYYY-MM-DD hh:mm:ss");

    const SQL_QUERY = 'UPDATE users SET pwd = ?, pwd_reset_requested = ?, pwd_reset = ? WHERE email = ?';

    DB.query(SQL_QUERY, [req.body.pwd,'Y', CURRENT_DAY, data.email], (err, result) => {
        if (err) throw err.message;

        return res.status(202).json({status: 'success', message: 'Password successfully reset.'});
    });
}

module.exports = resetPWD;