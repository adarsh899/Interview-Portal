const nodemailer = require('../config/nodemailer')
module.exports.scheduler = (user) =>
{
    nodemailer.sendMail({
        from: "recruiter.abcde@gmail.com", // sender address
        to: user, // list of receivers
        subject: "Interview Schedule ", // Subject line
        html: "<b>Your Interview is scheduled</b>", // html body
    }, (err, info) => {
        if (err)
            console.log(err);
        else
            console.log(info);
        return;
      });
    
    }
