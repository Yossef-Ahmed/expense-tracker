const bcrypt = require('bcryptjs');
const User = require('../../../models/User');

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
                            res.json({email: user.email, msg: "Registered Successfully, Open your email to verify your account"});
                        });
                });
            });
        });
};