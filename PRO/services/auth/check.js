const Validator = require('../Validator');


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

    // Collect the data sent to backend.
    const policy           = req.body.policy;
    const name             = req.body.name;
    const email            = req.body.email;
    const pwd              = req.body.pwd;
    const pwd_confirmation = req.body.pwd_confirm;
    
    // Declare rules for Validator.
    const rules = {
        policy: 'required',
        name: 'alphaWithout:<>{}!;:#@|min:2|max:20|required',
        email : 'required|email|max:30',
        pwd : 'required|alphaNumeric|confirmed',
        pwd_confirmation: 'required',
    }

    // Declare values for Validator.
    const values = {
        policy: policy,
        name : name,
        email : email,
        pwd : pwd,
        pwd_confirmation:  pwd_confirmation,
    }

    // Instantiate a new object to use validator class.
    const Validation = new Validator(rules, values);

    // Ask Validator to check for errors.
    Validation.check()
        .then(result => {
            // Successfull validation, move to next middleware.
            next();
        })
        .catch(error => {
            // Failed validation, send errors to frontend.
            res.status(400).send(error);
        });
}

module.exports = check;