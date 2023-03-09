module.exports = {
    "up": `CREATE TABLE exchanges (
        id INT PRIMARY KEY, 
        user_id INT UNIQUE NOT NULL, 
        amount INT, 
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP);`,
    "down": "DROP TABLE exchanges"
}