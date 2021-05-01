const jwt = require('jsonwebtoken');
const jwtSecret = process.env.jwtSecret || require('config').get('jwtSecret');

module.exports = (req, res, next) => {
    // Get the token
    const token = req.header('x-auth-token');
    // Check: if there's no token, return an error
    if (!token) return res.status(401).json({msg: 'No token, authorization denied'});
    // Try to verify the token
    try {
        const decoded = jwt.verify(token, jwtSecret);
        // Send the user id back
        req.user = decoded;
        next();
    } catch(err) {
        res.status(400).json({msg: 'Token is not valid'});
    }
}