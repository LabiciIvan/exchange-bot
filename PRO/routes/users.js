const express = require('express');
const router = express();
const DB = require('../config/mysql');
const isLogged = require('../middleware/isLogged');
const DecodeToken = require('../services/DecodeToken');
const isAdmin = require('../middleware/isAdmin');
const Validator = require('../services/Validator');
const moment = require('moment');
const createSignature = require('../services/createSignature');


// READ - route to get all the users.
router.get('/', isLogged, (req, res) => {
  (async () => {
    try {
      // Await for the resolved Promise from DecodeToken.
      const user = await DecodeToken(req.headers['authorization']);
    
      // Only admin can see all users.
      if (!isAdmin(user)) {return res.status(403).json({status: 'fail', message: "Unauthorized to perform this action!"})}

      // Get all users from database.
      const users = await new Promise((resolve, reject) => {
        const SQL_QUERY = 'SELECT users.name, users.email, users.pwd_reset, users.policy_agreement, accounts.validated, accounts.country, accounts.city, accounts.postal_zipp_code, accounts.street_address_one, accounts.profile_picture, accounts.age FROM users INNER JOIN accounts ON accounts.user_id=users.id;';
        
        DB.query(SQL_QUERY, (err, result) => {
          if (err) reject(err.message)
          else resolve(JSON.parse(JSON.stringify(result)));
        });
      });

      return res.status(200).json({status: 'success', message: 'Get users', data: users})

    } catch (err) {
      return res.status(500).json({status: "error", message: "Internal system error!"});
    }
  })();
});


// SHOW - route to get a custom user.
router.get('/account/:userId', isLogged, (req, res) => {
  (async () => {
    try {
      // Get the user_id from the url sent as parameter.
      const user_id = parseInt(req.params.userId);
      
      // Await for the resolved Promise from DecodeToken.
      let user =  await DecodeToken(req.headers['authorization']);
    
      // Users can see only their details.
      // Admin can see anyone details.
      if (user.id !== user_id) {
        if (!isAdmin(user)) return res.status(403).json({status: 'fail', message: "Unauthorized to perform this action!"});
      }
    
      const SQL_QUERY = 'SELECT users.name, users.email, accounts.user_id, accounts.validated, accounts.country, accounts.city, accounts.postal_zipp_code, accounts.street_address_one, accounts.profile_picture, accounts.signature FROM users INNER JOIN accounts ON accounts.user_id=users.id WHERE users.id = ? AND users.deleted = false';
    
      const account = await new Promise((resolve, reject) => {
        DB.query(SQL_QUERY, [user_id], (err, result) => {
          if (err) reject(err + err.message);
          else resolve(JSON.parse(JSON.stringify(result)));
        });
      });

      if (account.length < 1) {
        return res.status(404).send({status: 'fail', message: "This user doesn't exits."});
      }
  
      return res.send({status: 'success', message: `Details user ${account[0].user_id}`, data: account});

    } catch (err) {
      // Send error if rejected Promise from DecodeToken or DB.query.
      return res.status(404).send({status: "error", message: "Internal system error!"});
    }
  })();
});


// UPDATE - route to update the user account.
router.put('/account/:userId', isLogged, (req, res)  => {

  let reqParsed = JSON.parse(JSON.stringify(req.body));
  let userId = parseInt(req.params.userId);

  const rules = {
    country:            'required',
    city:               'required',
    postal_zipp_code:   'required|numeric',
    street_address_one: 'required',
    street_address_two: 'required',
    profile_picture:    'required',
    age:                'required|numeric'
  }

  const values = {
    country:            reqParsed.country,
    city:               reqParsed.city,
    postal_zipp_code:   reqParsed.postal_zipp_code,
    street_address_one: reqParsed.street_address_one,
    street_address_two: reqParsed.street_address_two, 
    profile_picture:    reqParsed.profile_picture, 
    age:                reqParsed.age
  }

  // Instantiate a new Validator instance.
  const Validation = new Validator(rules, values);
  Validation.check()
    .then(() => {
      // Validation success. Logic to handle updating user account.
      (async () => {
        try {
          // Decode the encoded token.
          const user = await DecodeToken(req.headers['authorization']);
          
          // Only user can update his account.
          if (user.id !== userId) {return res.status(403).json({status: 'fail', message: "Unauthorized to perform this action!"})}

          const SIGNATURE = createSignature(process.env.EXCHANGE_SECRET);
        
          const SQL_QUERY = `
          UPDATE accounts 
          SET country = ?,city = ?,postal_zipp_code = ?,street_address_one = ?,street_address_two = ?, profile_picture = ?,age = ?, validated = ?, signature = ? 
          WHERE user_id = ?
          AND validated = false AND deleted = false;`;

          const account = await new Promise ((resolve, reject) => {
            DB.query(SQL_QUERY, [reqParsed.country, reqParsed.city, reqParsed.postal_zipp_code, reqParsed.street_address_one, reqParsed.street_address_two, reqParsed.profile_picture, reqParsed.age, true, SIGNATURE, userId], (err, result) => {
              if (err) reject(err + err.message);
              else resolve(result);
            });
          });
          
          // Based on whether the user has validated their account or not.
          if (account.affectedRows === 0) {
            return res.status(200).json({status: 'fail', message: 'Request ADMIN help to update your account.'});
          } else {
            return res.status(200).json({status: 'success', message: 'Account successfully validated.'});
          }
          
        } catch (error) {
          return res.status(404).send({status: 'error', message: 'Impossible to validate !'});
        }
      })();

    })
  .catch(err => {
    // Validation fail.
    return res.status(404).send(err);
  });
});


// DELETE - route to delete the user account.
router.delete('/account/:userId', isLogged, (req, res) => {
  const userId = parseInt(req.params.userId);

  (async () => {
      try {
        // Decode the encoded token.
        const user = await DecodeToken(req.headers['authorization']);
    
        // Only user can delete his account.
        if (user.id !== userId) { return res.status(403).json({status: 'fail', message: 'Unauthorized to perform this action.'});} 

        // Delete user account.
        const SQL_QUERY = "UPDATE users INNER JOIN accounts ON users.id = accounts.user_id  INNER JOIN tokens ON users.id = tokens.user_id SET users.deleted = ?, users.deleted_at = ?, accounts.deleted = ?, tokens.deleted = ? WHERE users.id = ? AND users.deleted = ?";

        const deletedUser = await new Promise((resolve, reject) => {
          DB.query(SQL_QUERY, [true, moment().format("YYYY-MM-DD HH:mm:ss"), true, true, userId, false], (err, result) => {
            if (err) reject(err + err.message);
            else resolve(JSON.parse(JSON.stringify(result)));
          });
        });

        return res.status(200).json({status: 'success', message: 'The account has been deleted.'});

      } catch (error) {
        return res.status(404).send({status: "error", message: "Internal system error!"});
      }
  })();
});


module.exports = router;