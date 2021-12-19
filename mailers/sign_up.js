const nodeMailer = require('../config/nodemailer');

module.exports.signUp = (user) => {
    let htmlString = nodeMailer.renderTemplate({user:user},"/sign_up/send_otp.ejs");

    nodeMailer.transporter.sendMail({
        from: "pecbooks12@gmail.com",
        to: user.email,
        subject: "Sign Up",
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