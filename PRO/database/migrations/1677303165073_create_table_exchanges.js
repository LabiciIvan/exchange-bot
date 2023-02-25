module.exports = {
    "up": "CREATE TABLE exchanges (id INT PRIMARY KEY, user_id TINYINT UNIQUE NOT NULL, amount INT, created_at DATETIME);",
    "down": "DROP TABLE exchanges"
}