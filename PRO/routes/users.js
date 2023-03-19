const express = require('express');
const router = express();
const DB = require('../config/mysql');


router.get('/', (req, res) => {

  DB.query('SELECT * FROM users', (err, result) => {
    if (err) throw err.message;

    return res.send({status: 'success', message: 'List with all users', data: result});
  })
});


module.exports = router;