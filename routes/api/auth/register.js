const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../../models/User');
const jwtSecret = process.env.jwtSecret || require('config').get('jwtSecret');

module.exports = (req, res) => {
    const {name, email, password} = req.body;
    
    if (!name || !email || !password) {
        return res.status(400).json({msg: 'Please enter all fields'});
    }

    User.findOne({email})
        .then(user => {
            if (user) return res.status(400).json({msg: 'User already exists'});
            
            const newUser = new User({
                name,
                email,
                password
            });
            
            bcrypt.genSalt(10, (err, salt) => {
                if (err) throw err;
                bcrypt.hash(newUser.password, salt, (err, hashedPassword) => {
                    if (err) throw err;
                    
                    newUser.password = hashedPassword;
                    newUser.save()
                        .then(user => {
                            jwt.sign(
                                {id: user.id},
                                jwtSecret,
                                {expiresIn: 43200},
                                (err, token) => {
                                    if (err) throw err;
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
            });
        });
};