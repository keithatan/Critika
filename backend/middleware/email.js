var nodemailer = require('nodemailer');

var email_address = "critika.app@gmail.com";

/**
 * Sends an email from critika.app@gmail.com to the specified 'to' email, with a subject and body given by the 
 * function caller.
 * @param {string} to 
 * @param {string} subject 
 * @param {string} body 
 */
function mailer(to, subject, body) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: email_address,
            pass: process.env.EMAIL_PASSWD
        }
    });

    var mailOptions = {
        from: email_address,
        to: to,
        subject: subject,
        text: body
    };

    //console.log("Sending to: " + to)
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            //console.error(error);
        } else {
            //console.log('Email sent: ' + info.response);
            return;
        }
    });
}

module.exports = mailer;