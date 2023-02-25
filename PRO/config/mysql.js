require('dotenv').config({path: '../.env'});
const mysql = require('mysql')

const database = mysql.createConnection({
  host: (process.env.DB_HOST || null),
  user: (process.env.DB_USER || null),
  password: (process.env.DB_PWD || null),
  database: (process.env.DB_NAME || null)
})

database.connect(function(err) {
  if (err) throw err.message;
  console.log("Database Connected!");
});

module.exports = database;
