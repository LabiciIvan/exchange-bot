module.exports = {
    "up": `CREATE TABLE IF NOT EXISTS exchanges (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        type ENUM('BUY', 'SELL') NOT NULL,
        amount INT NOT NULL,
        currency VARCHAR(10) NOT NULL,
        rate INT NOT NULL,
        fee INT NOT NULL,
        status ENUM('PENDING', 'COMPLETED') NOT NULL,
        notes TEXT,
        deleted BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deleted_at DATETIME NULL,
        CONSTRAINT fk_exchanges_users FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE);`,
    "down": "DROP TABLE exchanges"
}