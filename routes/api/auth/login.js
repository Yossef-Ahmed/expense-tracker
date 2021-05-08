const bcrypt = require('bcryptjs');
const User = require('../../../models/User');
const createJWT = require('../../../utils/createJWT');
const sendUserData = require('../../../utils/sendUserData');

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
                    
                    if(user.active) {
                        createJWT(user.id, (err, token) => {
                            if (err) throw err;
                            sendUserData(user, token, res, "Logged In Successfully");
                        });
                    } else {
                        res.json({msg: "Please verify your email first", userActive: false, email: user.email})
                    }
                });
        });
};