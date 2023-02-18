var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.send({data: 'api request to index'})
});

module.exports = router;
