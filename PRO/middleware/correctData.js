let express = require('express');

function correctData(req, res, next) {

    if (req.headers.accept !== 'application/json') {

        res.send({error:'Invalid format application / json required!'});

    } else {
        next();
    }
}

module.exports = correctData;