const nodemailer = require('nodemailer');
const config = require('config');

module.exports = (to, subject, html) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: 'OAuth2',
            user: process.env.MAIL_USER || config.get('MAIL_USER'),
            pass: process.env.MAIL_PASSWORD || config.get('MAIL_PASSWORD'),
            clientId: process.env.OAUTH_CLIENTID  || config.get('OAUTH_CLIENTID'),
            clientSecret: process.env.OAUTH_CLIENT_SECRET  || config.get('OAUTH_CLIENT_SECRET'),
            refreshToken: process.env.OAUTH_REFRESH_TOKEN  || config.get('OAUTH_REFRESH_TOKEN')
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    var mailOptions = {
        from: "Expense Tracker Team, <uosefd@gmail.com>",
        to: to,
        subject: subject,
        html: html
    };

    console.log("Sending email this may take a while ....");
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("error send email: ", error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}