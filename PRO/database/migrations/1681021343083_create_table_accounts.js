module.exports = {
    "up": `CREATE TABLE IF NOT EXISTS accounts (
        id INT PRIMARY KEY AUTO_INCREMENT,
        country VARCHAR(255) DEFAULT NULL, 
        city VARCHAR(255) DEFAULT NULL,
        postal_zipp_code VARCHAR(255) DEFAULT NULL,
        street_address_one TEXT DEFAULT NULL,
        street_address_two TEXT DEFAULT NULL,
        profile_picture TEXT DEFAULT NULL,
        age VARCHAR(255) DEFAULT NULL,
        validated BOOLEAN DEFAULT FALSE,
        user_id INT,
        deleted BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT fk_accounts_users FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
    );`,
    "down": "DROP TABLE accounts"
}