var nodemailer = require('nodemailer');
var url = "http://localhost:3000/signup_verified";

var email_transporter = {
    sendMail : function(mailOptions, callback){
        mailOptions.to = mailOptions.to || 'aishwat.singh@gmail.com';
        mailOptions.subject = mailOptions.subject || 'Account Verification';
        mailOptions.html = mailOptions.html || '<button ><a href="'+url+'?token='+mailOptions.token+'" style="text-decoration:none;">Verify Account</a></button>';

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'mayurjoshi9876@gmail.com',
                pass: '' // Fill in password
            }
        });

        transporter.sendMail(mailOptions, callback);
    }
};

module.exports = email_transporter;