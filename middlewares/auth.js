const jwt = require('jsonwebtoken');
const jwtSecret = process.env.jwtSecret || require('config').get('jwtSecret');

module.exports = (req, res, next) => {
    const token = req.header('x-auth-token');
    
    if (!token) return res.status(401).json({msg: 'No token, authorization denied'});
    
    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded;
        next();
    } catch(err) {
        res.status(400).json({msg: 'Token is not valid'});
    }
}