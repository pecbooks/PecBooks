const nodeMailer = require('../config/nodemailer');

module.exports.resetPassword = (user) => {
    let htmlString = nodeMailer.renderTemplate({user:user},"/reset_password/send_otp.ejs");

    nodeMailer.transporter.sendMail({
        from: "pecbooks12@gmail.com",
        to: user.email,
        subject: "Password Reset",
        html: htmlString
    },(err,info) => {
        if(err){
            console.log("Error in sending mail", err);
            return;
        }
        console.log("Mail Sent", info);
        return;
    });
}