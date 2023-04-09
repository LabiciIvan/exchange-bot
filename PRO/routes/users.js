const express = require('express');
const router = express();
const DB = require('../config/mysql');
const verifyJWT = require('../middleware/verifyJWT');
const decodeJWT = require('../middleware/decodeJWT');

// Route to get all the users.
router.get('/', (req, res) => {

  DB.query('SELECT * FROM users', (err, result) => {
    if (err) throw err.message;

    return res.send({status: 'success', message: 'List with all users', data: result});
  });
});


// Route to get a custom user.
router.get('/account/:userId', verifyJWT,  (req, res) => {
  
  // Get the user_id from the request.
  const user_id = req.params.userId;

  // Get token | Split token| Decode Token.
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  const decoded = decodeJWT(token);

  // Check if token isn't null, might expired on the way.
  if (!decoded) {
    return res.status(404).send(['No account for this user!']);
  }

  // ParseInt both values and check, go deeper to check if admin right.
  if (parseInt(decoded.id) !== parseInt(user_id)) {

    if (decoded.admin !== true ) {} 
    return res.status(401).send(['Unauthorized to perform this action']);
  }

  const SQL_QUERY = 'SELECT users.name, users.email, accounts.user_id, accounts.validated, accounts.country, accounts.city, accounts.postal_zipp_code, accounts.street_address_one, accounts.profile_picture FROM users INNER JOIN accounts ON accounts.user_id=users.id WHERE users.id = ?';

  DB.query(SQL_QUERY, [user_id], (err, result) => {
    if (err) throw err.message;
    
    if (result.length < 1) {
      return res.status(404).send(['No account for this user']);
    }

    return res.send({status: 'success', data: result});
  });
});


module.exports = router;