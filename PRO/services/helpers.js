let express = require('express');
let database = require('../config/mysql')

function correctData(req, res, next) {

    if (req.headers.accept !== 'application/json') {

        res.send({error:'Invalid format application / json required!'});

    } else {
        next();
    }
}

function queryDB(req, res, next) {
    
    let sql = `SELECT * FROM users WHERE email LIKE '${req.body.email}';`;
    console.log(sql);

    database.query(sql, (err, result) => {
        if (err) throw err.message;

        let res = JSON.stringify(result);
        console.log(JSON.parse(res.length));
    });
    next();
}

module.exports = {correctData , queryDB};