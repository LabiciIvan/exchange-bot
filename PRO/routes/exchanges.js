const express = require('express');
const router = express();

const isLogged = require('../middleware/isLogged');


router.get('/', isLogged, (req, res) => {
  
return res.json({status: 'success', message: 'exchange route', data: ''})

});

module.exports = router;
