var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.send({data: 'request to exchanges'})
});

module.exports = router;
