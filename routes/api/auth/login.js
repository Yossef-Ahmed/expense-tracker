const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../../models/User');
const jwtSecret = process.env.jwtSecret || require('config').get('jwtSecret');

module.exports = (req, res) => {
    const {email, password} = req.body;
    
    if (!email || !password) {
        res.status(400).json({msg: 'Please enter all fields'});
    }
    
    User.findOne({email})
        .then(user => {
            if (!user) return res.status(400).json({msg: 'User does not exist'});
            
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(!isMatch) return res.status(400).json({msg: 'Please enter the right email and password'});
                    
                    jwt.sign(
                        {id: user.id},
                        jwtSecret,
                        {expiresIn: 3600},
                        (err, token) => {
                            if(err) throw err;
                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email
                                },
                                categories: user.categories
                            });
                        }
                    );
                });
        });
};