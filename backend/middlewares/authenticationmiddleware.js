const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header('token');
    if (token === undefined) {
        res.status(400).json({ message: 'Invalid JWT Token' });
    }
    try {
        jwt.verify(token, 'MY_SECRET_TOKEN');
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid JWT Token' });
    }
};
