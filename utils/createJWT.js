const jwt = require('jsonwebtoken');
const jwtSecret = process.env.jwtSecret || require('config').get('jwtSecret');

module.exports = (userId, callback) => {
    jwt.sign(
        {id: userId},
        jwtSecret,
        {expiresIn: 43200},
        (err, token) => callback(err, token)
    );
}