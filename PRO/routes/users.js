var express = require('express');
var router = express.Router();
var database = require('../config/mysql');


router.get('/', function(req, res, next) {

  let sql = "INSERT INTO users (name, email) VALUES ('test', 'test@MediaList.com')";

  res.send('I am response from users.js')
  database.query(sql, (err, result) => {
    if (err) throw err.message;
    console.log('query succesfull');
  })
});


module.exports = router;
