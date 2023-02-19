var express = require('express');
var router = express.Router();
// var database = require('../config/mysql');

const correctData = require('../middleware/correctData');

router.use(correctData);

router.get('/', function(req, res) {
  res.send(
    data =  {
      name: 'John Doe',
      email: 'John-Doe@mail.com',
      token: '$xasd7636w9cjsh='
    }
  )
});



module.exports = router;
