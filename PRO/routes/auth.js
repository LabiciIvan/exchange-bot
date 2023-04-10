require("dotenv").config({path: "../.env"});
const express = require('express');
const router = express();

const jwt = require('jsonwebtoken');
const DB = require('../config/mysql');
const verifyJWT = require('../middleware/verifyJWT');
const decodeJWT = require('../middleware/decodeJWT');

const check = require('../services/auth/check');
const exists = require('../services/auth/exists');
const hashPWD = require('../services/auth/hashPWD');
const login= require('../services/auth/login');
const resetPWD = require('../services/auth/resetPWD');
const limitResetPWD = require('../services/auth/limitResetPWD');


// Route to sign up [ REGISTER or CREATE ACCOUNT ]
router.post('/signup',check, exists, hashPWD, (req, res) => {

  const SQL_INSERT_U= 'INSERT INTO users(name, email, pwd, policy_agreement) VALUES (?,?,?,?)';

  DB.query(SQL_INSERT_U, [req.body.name, req.body.email, req.body.pwd, 'agreement_2023'], (err, result) => {
    if (err) throw err.message;
    
    const result2 = JSON.parse(JSON.stringify(result));

    const SQL_INSERT_A = "INSERT INTO accounts (user_id) VALUES (?);"; 

    DB.query(SQL_INSERT_A, [result2.insertId], (err, result) => {
      if (err) throw err.message;
    });

    return res.send({status: 'success', message: 'Your account has been created.', data: result2.insertId });
  })
});


// Route to sign in | LOG IN
router.post('/signin', login, (req, res) => {
  
  let sql = 'SELECT id, admin FROM users WHERE email = ?';

  DB.query(sql, [req.body.email], (err, result) => {
    if (err) throw err.message;

    const accessToken = jwt.sign(JSON.parse(JSON.stringify(result[0])), process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'});
    
    return res.status(200).json({status: 'success', message: 'Successfully signed.', data: accessToken});
  });

});


// Route to get the RESET PASSWORD LINK
router.post('/reset-password', limitResetPWD,  (req, res) => {

  const TOKEN = jwt.sign({email: req.body.email}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '5m'} )

  return res.status(202).json({status: 'success', message: 'REMEMBER YOU CAN RESET PASSWORD ONCE A DAY!', data: TOKEN});
  
});


// Route to handle the reset password LINK
router.post('/reset-password/verify/', (req, res, next) => {
  if (!req.body.token) return res.status(403).json({status: 'error', message: 'RESET TOKEN IS REQUIRED !!!'});
  const TOKEN = req.body.token;
  
  jwt.verify(TOKEN, process.env.ACCESS_TOKEN_SECRET, (err, result) => {

    if (err) return res.status(404).json({status: 'error', message: 'RESET LINK EXPIRED !'});
  });

  if (!req.body.pwd) return res.status(403).json({status: 'failed', message: 'Password is required!'});
  if (!req.body.pwd_confirm) return res.status(403).json({status: 'failed', message: 'Password confirmation is required!'});
  if (req.body.pwd_confirm !== req.body.pwd) return res.status(403).json({status: 'failed', message: 'Password don/\'t match!'});

  next();

}, hashPWD, resetPWD);


module.exports = router;