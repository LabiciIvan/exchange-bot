module.exports = {
    "up": `CREATE TABLE IF NOT EXISTS users (
        id int PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE, 
        pwd TEXT NOT NULL, 
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        pwd_reset_requested VARCHAR(1) NOT NULL DEFAULT 'N',
        pwd_reset TIMESTAMP NULL DEFAULT NULL);`,
    "down": "DROP TABLE users"
}