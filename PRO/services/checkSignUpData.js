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
const checkSignUpData = (req, res, next) =>  {
    let errorFound = false;
    let error = [];
  
    if (!req.body.name || !req.body.email || !req.body.pwd || !req.body.pwd_confirm ) errorFound = true;
  
    !req.body.name ? error.push({name: "Field name is required"}) : '';
    !req.body.email ? error.push({email: "Field email is required"}) : '';
    !req.body.pwd ? error.push({password: "Field password is required"}) : '';
    !req.body.pwd_confirm ? error.push({password_confirmation: "Field password confirmation is required"}) : '';
    
    if (errorFound) {return res.status(400).json({error})} else {next()}
}

module.exports = checkSignUpData;