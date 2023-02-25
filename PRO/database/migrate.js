require("dotenv").config({path: "../.env"});

const database = require('mysql');
const migration = require('mysql-migrations');

const connection = database.createPool({
    connectionLimit : 10,
    host: (process.env.DB_HOST || null),
    user: (process.env.DB_USER || null),
    password: (process.env.DB_PWD || null),
    database: (process.env.DB_NAME || null)
});

migration.init(connection, __dirname + '/migrations/', function() {
    console.log('Finished running migrations');
})