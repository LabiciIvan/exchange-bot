const express = require('express');
const jwt = require('jsonwebtoken');


const decodeJWT = (req, res, next) => {
    
    const authHeader = req.headers['authorization'];
    
    const token = authHeader && authHeader.split(' ')[1];

    const result = jwt.decode(token)

    next();
}

module.exports = decodeJWT;