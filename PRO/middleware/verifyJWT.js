require('dotenv').config();

const express = require('express');
const jwt = require('jsonwebtoken');


/**
 * @author Ioan Labici <labici.ioan@yahoo.com>
 * 
 * Checks if the the token is header request, if not then will 
 * send error sayin you are not authorized.
 * If token is present, it will check if token expired, if so it will
 * send error saying token expired.
 */
const verifyJWT = (req, res, next) => {

    const authHeader = req.headers['authorization'];
    
    const token = authHeader && authHeader.split(' ')[1];

    if (authHeader === undefined) {
        return res.status(401).json({error: 'You are not logged in!'});
    } 

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err) => {
        if (err)  {  
            return res.status(403).json({error: 'Token expired'});
        } else {next()}
    });
}


module.exports = verifyJWT;