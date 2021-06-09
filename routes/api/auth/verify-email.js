const User = require('../../../models/User');
const createJWT = require('../../../utils/createJWT');
const sendUserData = require('../../../utils/sendUserData');

module.exports = (req, res) => {
    const {email, verificationCode} = req.body;

    User.findOne({email, verificationCode, active: false})
        .then(user => {
            user.active = true;
            user.verificationCode = null;
            user.sentVerificationCodeAt = null;
            user.save()
                .then(user => {
                    createJWT(user._id, (err, token) => {
                        if (err) throw err;
                        sendUserData(user, token, res, "Logged In Successfully");
                    });
                });
        })
        .catch(() => {
            res.status(406).json({msg: "Either verification code is not valid or email is already validated"})
        })
}