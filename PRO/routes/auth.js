require("dotenv").config({path: "../.env"});
const express = require('express');
const router = express();

const jwt = require('jsonwebtoken');
const DB = require('../config/mysql');


const check = require('../services/auth/check');
const exists = require('../services/auth/exists');
const hashPWD = require('../services/auth/hashPWD');
const login= require('../services/auth/login');
const resetPWD = require('../services/auth/resetPWD');
const limitResetPWD = require('../services/auth/limitResetPWD');


//  CREATE -  route to sign up, others reffer to create account.
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


// CREATE - route to sign in, others reffer to as log in.
router.post('/signin', login, (req, res) => {

  const SQL_USERS_SELECT = 'SELECT id, admin FROM users WHERE email = ?';
  // PERFECT EXAMPLE OF CALLBACK HELL.
  DB.query(SQL_USERS_SELECT, [req.body.email], (err, result) => {
    if (err) throw err.message;

    // Format the result from database in a JSON object.
    const user = JSON.parse(JSON.stringify(result[0]));

    // Create accessToken.
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'});
    const SQL_TOKENS_INSERT = "INSERT INTO tokens (user_id, token) VALUES (?,?);";
    
    // Save accessToken in Database.
    DB.query(SQL_TOKENS_INSERT, [user.id, accessToken], (err, result) => {
      if (err) {
        // This user already has a token, UPDATE with new token.
        const SQL_TOKENS_UPDATE = "UPDATE tokens SET token = ? WHERE user_id = ?;";
        // Updating tokens for this user.
        DB.query(SQL_TOKENS_UPDATE, [accessToken, user.id], err => {if (err) throw err.message;});
      }
    });

    return res.status(200).json({status: 'success', message: 'Successfully signed.', data: accessToken});
  });
});


// READ - route to get the RESET PASSWORD LINK.
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

  if (!req.body.pwd) return res.status(403).json({status: 'fail', message: 'Password is required!'});
  if (!req.body.pwd_confirm) return res.status(403).json({status: 'fail', message: 'Password confirmation is required!'});
  if (req.body.pwd_confirm !== req.body.pwd) return res.status(403).json({status: 'fail', message: 'Password don/\'t match!'});

  next();

}, hashPWD, resetPWD);


module.exports = router;