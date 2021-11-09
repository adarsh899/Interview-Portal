const nodemailer = require('../config/nodemailer')
module.exports.scheduler = (user,interview) =>
{
    nodemailer.sendMail({
        from: "recruiter.abcde@gmail.com", // sender address
        to: user.email, // list of receivers
        subject: "Interview Schedule with ABCDE", // Subject line
        html: `<b>Hi ${user.name}, <br/> Your Interview is scheduled at ${interview.date} from ${interview.start_time} to ${interview.end_time}. </b>`, // html body
    }, (err, info) => {
        if (err)
            console.log(err);
        else
            console.log(info);
        return;
      });
    
    }
    module.exports.updatescheduler = (user,date,start_time,end_time) =>
    {
        nodemailer.sendMail({
            from: "recruiter.abcde@gmail.com", // sender address
            to: user.email, // list of receivers
            subject: "Updated Interview Schedule with ABCDE", // Subject line
            html: `<b>Hi ${user.name}, <br/> Your Interview is rescheduled at ${date} from ${start_time} to ${end_time}. <br/> Sorry for the inconvenience.  </b>`, // html body
        }, (err, info) => {
            if (err)
                console.log(err);
            else
                console.log(info);
            return;
          });
        
}
module.exports.deletescheduler = (user,interview) =>
{
    nodemailer.sendMail({
        from: "recruiter.abcde@gmail.com", // sender address
        to: user.email, // list of receivers
        subject: "Interview is Canceled with ABCDE", // Subject line
        html: `<b>Hi ${user.name}, <br/> Your Interview is canceled which was scheduled at ${interview.date} from ${interview.start_time} to ${interview.end_time}. </b>`, // html body
    }, (err, info) => {
        if (err)
            console.log(err);
        else
            console.log(info);
        return;
      });
    
}
    