/**
 *  The Validator class is designed to simplify the process of validating 
 *  form fields in JavaScript.
 * 
 *  It provides a simple and intuitive interface for validating fields,
 *  while abstracting away the complexity of regular expressions and other validation techniques.
 * 
 *  AVAILABLE METHODS :
 *
 *  required      -  checks if value is not empty, undefined or null. 
 * 
 * 
 *  min           -  checks if value is not lower then mentioned min value.
 * 
 * 
 *  max           - checks if value is not higher then mentioned max value.
 * 
 * 
 *  alpha         - checks if value is ONLY alphabet characters.
 * 
 * 
 *  numeric       - checks if value is ONLY number characters.
 * 
 * 
 *  alphaNumeric  - checks if value is made from alphabet aharacters and number characters.
 * 
 * 
 *  alphaWithout  - checks if value is made from alphabet characters or numbers and not allow special characters.
 * 
 * 
 *  confirmed     - checks if there is another field with exact name, but concatenated with _confirmation
 *                  this way it will check the value of the fields to match.
 * 
 * 
 *  email         - checks if the field under validation is an email format. It is very hard to cover all email
 *                  addresses format, this is why we can ensure at least is the wanted format, to check if is valid you 
 *                  should relay on other services.
 *
 * @class Validator
 *
 * @author Ioan Labici <labici.ioan@yahoo.com>
 */
class Validator {

    errorOn = false;
    errors = [];

    /**
     * 
     * @param {JSON} rules - A JSON object containing the fields and rules. Typically use the field name followed
     *                                     by a colon (:) and a string ('') with rules delimited by ( | ).
     * 
     *                                  Example:  {name  : 'required | alpha | max : 10 ',
     *                                             email : 'required | email | min : 10 '}.
     * 
     * @param {JSON} values - A JSON object containing the fields declared in rules and value. Typically the field name followed
     *                                      by a colon (:) and the value for that field.
     * 
     *                                  Example:  {name  : 'validator',
     *                                             email : 'validator@gmail.com'}.
     */
    constructor(rules, values) { 
        try {
            this.values = values;
            this.rules = rules;

            this.rulesKeys = Object.keys(rules);
            this.valueKeys = Object.keys(values);
            
            this.#validate();

        } catch (error) {
            throw error;
        }
    }

    /**
     * @private
     * Iterates over the declared rules and splits them by '|' character.
     * Extracts every rule and passes it to the 'analiseRule' function
     * which analyzes the rule for the given value.
     * 
     * @returns {void}
     */
    #validate() {
        this.rulesKeys.forEach(key => {
            let rule = this.rules[key];
            let ruleSplit = rule.split('|');

            this.#analiseRule(key, this.values[key], ruleSplit);
            
        });
    }

    /**
     * Analyze a single validation rule for a given key-value pair.
     *
     * @private
     * @param {string} key - The key to validate.
     * @param {string} value - The value to validate for the given key.
     * @param {string} ruleSplit - The extracted validation rule to analyze.
     */
    #analiseRule(key, value, ruleSplit) {

        let assuredRules = this.assureRules(ruleSplit);
        
        assuredRules.forEach(individualRule => {
            if (individualRule.includes('min')) {
                let ruleCondition = individualRule.replace('min:', '');

                this.ruleExecutor['min'](key, value, ruleCondition);
            }
            else if (individualRule.includes('max')) {
                let ruleCondition = individualRule.replace('max:', '');

                this.ruleExecutor['max'](key, value, ruleCondition);
            }
            else if (individualRule.includes('alphaWithout')) {
                let ruleCondition = individualRule.replace('alphaWithout:', '');
    
                this.ruleExecutor['alphaWithout'](key, value, ruleCondition);  
            }
            else
            {
                try {
                    this.ruleExecutor[individualRule](key, value);
                } catch (error) {
                    throw new Error(`This rule doesn\'t exists | ${individualRule} |`, error);
                }
            }
        });
    }

    /**
     * Object containing validation rules to be executed on form fields.
     * @namespace ruleExecutor
     * @property {Function} required - Validates whether a field is required and has a value.
     * @property {Function} min - Validates whether a field has a minimum length.
     * @property {Function} max - Validates whether a field has a maximum length.
     * @property {Function} alpha - Validates whether a field has only letters.
     * @property {Function} numeric - Validates whether a field has only numbers.
     * @property {Function} alphaNumeric - Validates whether a field has only numbers and letters.
     * @property {Function} alphaWithout - Validates whether a field contains a certain string.
     * @property {Function} confirmed - Validates whether a field's value matches a confirmation field.
     * @property {Function} email - Validates whether a field's value is in a valid email format.
     */
    ruleExecutor = {
        required: (key, val) => {
            if (val === '' || val === null) this.packError(this.ruleError['required'](key), key);
        },
        min: (key, val, condition) => {
            if (val === undefined || val === '' || val == null) {
                return;
            }
            else
            {
                val.length < parseInt(condition) ? this.packError(this.ruleError['min'](key, condition), key) : '';
            } 
        },
        max: (key, val, condition) => {
            if (val === undefined || val === ' ' || val == null) {
                return;
            }
            else
            {
                val.length > parseInt(condition) === true ? this.packError(this.ruleError['max'](key, condition), key) : '';
            } 
        },
        alpha: (key, val) => {

            const alpha = /^\w\D+$/;

            let result = alpha.test(val);

            if (result !== true) this.packError(this.ruleError['alpha'](key, val), key);
        },
        numeric: (key, val) => {
            const numeric = /^(?=.*\d)[\d ]+$/;
            let result = numeric.test(val);

            if (result !== true) this.packError(this.ruleError['numeric'](key, val), key);
        },
        alphaNumeric: (key, val) => {
            
            const alphaNumeric = /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/;

            let result = alphaNumeric.test(val);

            if (result !== true) this.packError(this.ruleError['alphaNumeric'](key, val), key);
        },
        alphaWithout: (key,val, condition) => {

                let WITHOUT = new RegExp(`^[^${condition}]*$`);

                let result = WITHOUT.test(val);

                if (result !== true) this.packError(this.ruleError['alphaWithout'](key, val), key);
            
        },
        confirmed: (key, val) => {
            if (val === undefined || val === '' || val === null) {return}

            let exists = false;
            
            let PWD_CONFIRMATION = `${key}_confirmation`;

            this.valueKeys.forEach(k => {
                if (PWD_CONFIRMATION === k) {exists = true;}
            });
            
            if (exists !== true) {
                this.packError(this.ruleError['confirmed'](key, false), key)
            }
            else if (this.values[key] !== this.values[PWD_CONFIRMATION]) 
            {
                this.packError(this.ruleError['confirmed'](key, val), key);

            }
        },
        email: (key, val) => {
            if (val === undefined || val === '' || val === null) {return}

            let EMAIL = new RegExp(/^[^\s@]+@[a-zA-Z]+\.[a-zA-Z]{2,3}$/);

            let result = EMAIL.test(val);

            if (result !== true) this.packError(this.ruleError['email'](key, val), key);
        }
    }

    /**
     * Object containing error messages for various validation rules.
     * @namespace ruleError
     * @property {function} required - Error message for required validation rule.
     * @property {function} min - Error message for minimum length validation rule.
     * @property {function} max - Error message for maximum length validation rule.
     * @property {function} alpha - Error message for alphabetic characters only validation rule.
     * @property {function} numeric - Error message for numeric characters only validation rule.
     * @property {function} alphaNumeric - Error message for alphanumeric characters only validation rule.
     * @property {function} alphaWithout - Error message for characters not allowed validation rule.
     * @property {function} confirmed - Error message for confirmation validation rule.
     * @property {function} email - Error message for email format validation rule.
     */
    ruleError = {
        required: (key) => {
            return `The field ${key} is required!`;
        },
        min: (key, condition) => {
            return `The field ${key} can be minimum ${condition} characters .`;
        },
        max: (key, condition) => {
            return `The field ${key} can be maximum ${condition} characters .`;
        },
        alpha: (key, val) => {
            return `The field ${key} can only be letters.`
        },
        numeric: (key, val) => {
            return `The field ${key} can only be numbers.`
        },
        alphaNumeric: (key, val) => {
            return `The field ${key} can be numbers and letters.`
        },
        alphaWithout: (key, condition) => {
            return `Format  ${''.repeat(2) +  condition + ' '.repeat(2)} is not allowed in ${key}.`
        },
        confirmed: (key, val) => {
            if (val === false) {
                return `The field ${key} needs a ${key}_confirmation to match!`;
            }
            
            return `The ${key}s don't match!`;
        },
        email: (key, val) => {
            return `The ${key} is not valid format!`;
        }
    }

    /**
     * Asynchronously checks for errors in the input values
     * and returns a Promise with the result.
     * @async
     * @function check
     * @returns {Promise} A Promise that resolves with `true` if there are no errors or rejects
     * with an object containing grouped error messages if there are errors.
     */
    check() {
        return new Promise((resolve, reject) => {
            this.errors = JSON.parse(JSON.stringify(this.errors));

            this.errors.length > 0 ? this.errorOn = true : '';

            let errorsGrouped = {};

            this.errors.forEach(er => {

                let error = er;
                let errorName = Object.keys(error)[0];
                let errorMessage = error[`${errorName}`];

                if (!errorsGrouped[errorName]) {
                    errorsGrouped[errorName] = [];
                }

                errorsGrouped[errorName].push(errorMessage);
            });

            this.errorOn === true ? reject(errorsGrouped) : resolve(true);
        });
    }

    /**
     * Create a new error object with a specific message and key
     * and add it to the array of errors in the current instance of the class.
     * @async
     * @function packError
     * @param {string} message - The error message to include in the error object.
     * @param {string} key - The key to which the error message is related.
     * 
     * @returns {Promise<boolean>} - A promise that resolves to true if the error object was successfully added to the array of errors.
     */
    async packError(message, key) {

        return new Promise ((resolved, rejected) => {

            let validationError = {};
            validationError[key] = message;

            this.errors.push(validationError);
            resolved(true);
        });
    }

    /**
     * Sanitizes an array of rule strings by removing whitespace and empty rules.
     * @param {string[]} ruleSplit - An array of rule strings to sanitize.
     * @returns {string[]} An array of sanitized rule strings.
     */
    assureRules(ruleSplit) {
        let sanitizeRules = [];
        
        // Iterate every rule and remove white spaces and trim.
        ruleSplit.filter(rule => {
            let trimmed  = rule.trim();
            let noSpaces = trimmed.replace(/\s+/g, '');
            
            noSpaces.length > 0 ? sanitizeRules.push(noSpaces) : '';

            return noSpaces.length > 0;
        });

        return sanitizeRules;
    }
}

module.exports = Validator;