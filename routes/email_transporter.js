var nodemailer = require('nodemailer');

var email_transporter = {
    sendMail : function(mailOptions, callback){
        var url = "http://localhost:3000/signup_verified";
        if(mailOptions.to ? mailOptions.to : mailOptions.to= 'aishwat.singh@gmail.com');
        if(mailOptions.subject ? mailOptions.subject : mailOptions.subject= 'Account Verification');
        if(mailOptions.html ? mailOptions.html : mailOptions.html= '<button ><a href="'+url+'?token='+mailOptions.token+'" style="text-decoration:none;">Verify Account</a></button>');
        
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'nxgensheldon@gmail.com',
                pass: 'Tesco@123'
            }
        });
        transporter.sendMail(mailOptions,callback);
    }
}
module.exports = email_transporter;








