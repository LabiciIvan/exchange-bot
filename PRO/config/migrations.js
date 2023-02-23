let express = require('express');
let database = require('./mysql');
let router = express.Router();


router.get('/', (req, res) => {
    
    migrateBase();
    
    res.send({data: "Migration success"});
})

const tablesDown = [
    'users',
    'exchanges'
];

const tablesUp = [
    'users (id INT PRIMARY KEY, name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL UNIQUE, pwd TEXT NOT NULL, created_at DATETIME);',
    'exchanges (id INT PRIMARY KEY, user_id TINYINT UNIQUE NOT NULL, amount INT, created_at DATETIME);'
];

function migrateBase() {

    
    tablesDown.forEach(tbName => {
        
        let sql = `DROP TABLE IF EXISTS ${tbName}`;

        database.query(sql, (err, res) => {
            if (err) throw err.message;
            console.log('migrated down');
        })
    });

    tablesUp.forEach(tbName => {
        
        let sql = `CREATE TABLE IF NOT EXISTS ${tbName}`;

        database.query(sql, (err, res) => {
            if (err) throw err.message;
            console.log('migrated up');
        })
    });
}



module.exports = router;