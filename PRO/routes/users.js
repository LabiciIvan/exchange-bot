const express = require('express');
const router = express();
const searchUser = require('../middleware/searchUsers');
const hashPassword = require('../middleware/hashPassword');
const database = require('../config/mysql');

const helpers = require('../services/helpers');
const comparePassword = require('../middleware/comparePassword');

router.use(helpers.correctData);

router.get('/', function(req, res) {
  res.send(
    data =  {
      name: 'John Doe',
      email: 'John-Doe@mail.com',
      token: '$xasd7636w9cjsh='
    }
  )
});

// Route to sign up
router.post('/signup', searchUser, hashPassword, (req, res) => {

  let errorFound = false;
  let error = [];

  if (!req.body.name || !req.body.email || !req.body.pwd || !req.body.pwd_confirm ) errorFound = true;

  !req.body.name ? error.push({name: "Field name is required"}) : '';
  !req.body.email ? error.push({email: "Field email is required"}) : '';
  !req.body.pwd ? error.push({password: "Field password is required"}) : '';
  !req.body.pwd_confirm ? error.push({password_confirmation: "Field password confirmation is required"}) : '';

  if (errorFound) {return res.status(400).send({error})}

  let sqlStr = `INSERT INTO users(name, email, pwd) VALUES ('${req.body.name}','${req.body.email}','${req.body.pwd}');`;

  database.query(sqlStr, (err, result) => {
    if (err) throw err.message;

    return res.send(JSON.parse(JSON.stringify(result)));
  })
});

// Route to sign in
router.post('/signin', comparePassword, (req, res) => {
  
  let sql = `SELECT email FROM users WHERE email LIKE '%${req.body.email}%';`;

  database.query(sql, (err, result) => {
    if (err) throw err.message;
    
    return res.status(200).send({
      message: 'You are logged in',
      account: JSON.parse(JSON.stringify(result[0])),
    });
  })
})




module.exports = router;
