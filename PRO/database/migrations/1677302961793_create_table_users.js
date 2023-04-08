module.exports = {
    "up": `CREATE TABLE IF NOT EXISTS users (
        id int PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE, 
        pwd TEXT NOT NULL,
        admin BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        pwd_reset_requested VARCHAR(1) NOT NULL DEFAULT 'N',
        pwd_reset TIMESTAMP NULL DEFAULT NULL ,
        policy_agreement VARCHAR(255) DEFAULT NULL,
        policy_agreement_accepted TIMESTAMP DEFAULT CURRENT_TIMESTAMP);`,
    "down": "DROP TABLE users"
}