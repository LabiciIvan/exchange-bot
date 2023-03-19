require('dotenv').config({path: '../.env'});
const mysql = require('mysql')

const DB = mysql.createPool({
  connectionLimit : 5,
  host            : process.env.DB_HOST,
  user            : process.env.DB_USER,
  password        : process.env.DB_PWD,
  database        : process.env.DB_NAME,
});


DB.on('connection', function (connection) {
  console.log('Connected to database!');
});


module.exports = DB;