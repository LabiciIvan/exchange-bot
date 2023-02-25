require("dotenv").config({path: "../.env"});

const express = require('express');
const router = express();
const jwt = require('jsonwebtoken');
const database = require('../config/mysql');
const hashPWD = require('../middleware/hashPWD');
const verifyJWT = require("../middleware/verifyJWT");
const verifyRequest = require("../middleware/verifyRequest");
const checkSignUpData = require('../services/checkSignUpData');
const checkAccountExists = require('../services/checkAccountExists');
const checkLoginPassword = require('../services/checkLoginPassword');


router.use(verifyRequest);

router.get('/', verifyJWT, (req, res) => {
  res.send(
    data =  {
      name: 'John Doe',
      email: 'John-Doe@mail.com',
      token: '$xasd7636w9cjsh='
    }
  )
});



// Route to sign up
router.post('/signup',checkSignUpData , checkAccountExists, hashPWD, (req, res) => {

  let sqlStr = `INSERT INTO users(name, email, pwd) VALUES ('${req.body.name}','${req.body.email}','${req.body.pwd}');`;

  database.query(sqlStr, (err, result) => {
    if (err) throw err.message;

    return res.send(JSON.parse(JSON.stringify(result)));
  })
});


// Route to sign in
router.post('/signin', checkLoginPassword, (req, res) => {
  
  let sql = `SELECT email FROM users WHERE email LIKE '%${req.body.email}%';`;

  database.query(sql, (err, result) => {
    if (err) throw err.message;

    const accessToken = jwt.sign({account: JSON.parse(JSON.stringify(result[0]))}, process.env.ACCESS_TOKEN_SECRET);
    
    return res.status(200).json({accessToken: accessToken});
  })
});


module.exports = router;