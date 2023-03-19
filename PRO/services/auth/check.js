const express = require('express');


/**
 * @author Ioan Labici <labici.ioan@yahoo.com>
 * 
 *  Checks the data submited to create an account.
 * Data should be present and no field should be empty, if 
 * something is wrong, function will format the errors in a json object
 * and send back the response.
 * 
 */
const check = (req, res, next) =>  {
    let error = {status: '', message: {name: '', email: '', pwd: '', pwd_confirm: ''}};
  
    if (!req.body.name || !req.body.email || !req.body.pwd || !req.body.pwd_confirm ) error.status = 'failed';
  
    if (!req.body.name) error.message.name = 'Field name is required!';
    if (!req.body.email) error.message.email = 'Field email is required!';
    if (!req.body.pwd) error.message.pwd = 'Field password is required!';
    if (!req.body.pwd_confirm) error.message.pwd_confirm = 'Field password confirmation is required!';
    
    if (error.status === 'failed') {return res.status(400).send(error)} else {next()}
}

module.exports = check;