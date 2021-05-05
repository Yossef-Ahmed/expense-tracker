const User = require('../../../models/User');
const sendEmail = require('../../../utils/emailSender');

module.exports = (req, res) => {
    const {email, sendNow} = req.body;
    const verificationCode = Math.floor(Math.random() * (999999999 - 0) + 0);
    const message = `Hello ! \n  \
    \n Here is your activation code : \
    ${verificationCode} \
    \n This code is valid for 15 minutes \
    \n Expense Tracker Team`;

    User.findOne({email, active: false})
        .then(user => {
            const FifteenMin = 15 * 60 * 1000;
            if ((new Date() - user.sentVerificationCodeAt) >= FifteenMin || sendNow === true) {
                user.verificationCode = verificationCode;
                user.sentVerificationCodeAt = new Date();
                user.save(user => {
                    sendEmail(email, "Account Activation Code", message)
                    res.json({msg: "We've sent the activation code to your email"});
                });
            } else {
                res.json({msg: "We already sent you an email less than 15 minutes ago"})
            }
        })
        .catch(() => {
            res.json({msg: "The email is already validated or doesn't exist"})
        })
}