const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    // Not Need to Token
    const openEndpoints = [
        '/api/signup',
        '/api/login',
        '/api/freshdesk-webhook'
    ];

    if (openEndpoints.includes(req.originalUrl)) {
        return next();
    } else {
        if (!token) {
            res.status(206).json({ message: "Access denied. No token provided", statusCode: 206 });
        } else {
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET, { expiresIn: '1h' });

                req.user_id = decoded.id

                next();
            } catch (err) {
                res.status(206).json({ message: "Access denied. Invalid Token or Token Expired", statusCode: 206 });
            }
        }
    }
}