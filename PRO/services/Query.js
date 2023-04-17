const DB = require('../config/mysql');

/**
 * 
 * @param {string} sqlQuery 
 * @param {Array} data 
 * @returns {Promise}
 */
const Query = (sqlQuery, data = []) => {
    return new Promise((resolve, reject) => {        
        DB.query(sqlQuery, data, (err, result) => {
            if (err) reject(err) 
            else resolve(JSON.parse(JSON.stringify(result)));
        });
    });
}


module.exports = Query;