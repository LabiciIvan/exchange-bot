const CORS = {
    origin: 'http://localhost:5500',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-type', 'Accept','trusted'],
    credentials: true,
};


module.exports = CORS;