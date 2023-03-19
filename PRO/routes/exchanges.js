const express = require('express');
const router = express();

const verifyJWT = require('../middleware/verifyJWT');


router.get('/', verifyJWT, (req, res) => {
  
return res.json({status: 'success', message: 'exchange route', data: ''})

});

module.exports = router;
