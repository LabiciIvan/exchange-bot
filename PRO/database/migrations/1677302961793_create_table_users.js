module.exports = {
    "up": "CREATE TABLE IF NOT EXISTS users (id int PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL UNIQUE, pwd TEXT NOT NULL, created_at DATETIME);",
    "down": "DROP TABLE users"
}