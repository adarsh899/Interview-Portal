const Interview = require('../model/interview_schedule');
const User = require('../model/user');
const Mailer = require('../Mailing/schedule_mailer');
module.exports.schedule = async function (req, res)
{
    try
    {

        const interviewer = req.body.email;
        if (interviewer.length < 2)
            return res.json({mess:"Number of participants must be atleast 2" })
        
        const date = req.body.date;
        const start_time = req.body.start_time;
        const end_time = req.body.end_time;
        const current_date = new Date();
        var current_hour = parseInt(current_date.getHours());
        var current_min = parseInt(current_date.getMinutes());
        var st_hr = parseInt(start_time.split(':')[0]);
        var st_min = parseInt(start_time.split(':')[1]);
        var en_hr = parseInt(end_time.split(':')[0]);
        var en_min = parseInt(end_time.split(':')[1]);
       
        const m = date.split('-')[1];
        const d = date.split('-')[2];
        const y = date.split('-')[0];
        var cd = current_date.getDate();
        var cm = current_date.getMonth();
        cm += 1;
        var cy = current_date.getFullYear();
        if (cd<10)
            cd = "0" + cd;
        if (cm<10)
            cm = "0" + cm;
           
        
        if (y >= cy && m >= cm && d >= cd) {
           
            if (y == cy && m == cm && d == cd) {
                if (st_hr * 60 + st_min >= current_hour * 60 + current_min && en_hr * 60 + en_min > st_hr * 60 + st_min)
                    console.log("interview schedule")
                else
                    return res.status(200).json({ mess: "Invalid Start Time" });
            }
            else {
                console.log("interview schedule")
            }
            
        }
        else
                return res.status(200).json({ mess: "Invalid Date" });
        var check = 1;
        
        for ( participants of interviewer)
        {
            
            
            if (check == 0)
                break;
            
            const user = await User.findOne({ email: participants }).
                populate('interview_schedule');
            if (user)
            {
                
                var array = user.interview_schedule;
                
                for (let s = 0; s < array.length;s++)
                {
                    
                    if (array[s].date == date)
                    {
                        var s_hr = parseInt(array[s].start_time.split(':')[0]);
                        var s_min = parseInt(array[s].start_time.split(':')[1]);
                        var e_hr = parseInt(array[s].end_time.split(':')[0]);
                        var e_min = parseInt(array[s].end_time.split(':')[1]);
                        var x = s_hr * 60 + s_min;
                        var yy = e_hr * 60 + e_min;
                        var ss_hr = parseInt(start_time.split(':')[0]);
                        var ss_min = parseInt(start_time.split(':')[1]);
                        var ee_hr = parseInt(end_time.split(':')[0]);
                        var ee_min = parseInt(end_time.split(':')[1]);
                        var mm = ss_hr * 60 + ss_min;
                        var n = ee_hr * 60 + ee_min;
                        if ((x <= mm && yy >= mm) || (x <= n && yy >= n) || (yy<= n && x >=mm)) {
                            
                            check = 0;
                            break;
                        }

                            
                        }
                }
                }
            
         
        }
        if (check == false)
            return res.json({ mess: "Some of the Participants already has an interview.Please reschedule the interview" });
            
        const interview = await Interview.create({ date: date, start_time: start_time, end_time: end_time });
        if (interview) {
               
               for (let participants of interviewer) { 
                        const user = await User.findOne({ email: participants });
                   if (user) {
                            
                            user.interview_schedule.push(interview);
                       user.save();
                            interview.participants.push(user);
                            
                            Mailer.scheduler(user,interview);
                        }
                                
            }
            interview.save();
                        
                    }

               
        return res.status(200).json({ mess: "Interview schedule created" });
    }
    catch(err)
    {
        return res.status(200).json({ mess: "Interview is not scheduled" });
    }
}
module.exports.getSchedule = async (req, res) =>
{
    
    try
    {
        const interview_schedule = await Interview.find({}).
        populate('participants');
        return res.status(200).json({ mess: "upcoming interview", interview_schedule: interview_schedule });

    }
    catch (err) {
        return res.status(200).json({ mess: "no upcoming interview" });
        
    }

}
module.exports.update = async(req, res) =>
{
    try
    {
       
        const interview = await Interview.findOne({ _id: req.params.id });
        const interviewer = req.body.email;
        if (interviewer.length < 2)
            return res.json({mess:"Number of participants must be atleast 2" })
        const date = req.body.date;
        const start_time = req.body.start_time;
        const end_time = req.body.end_time;
        const current_date = new Date();
        var current_hour = parseInt(current_date.getHours());
        var current_min = parseInt(current_date.getMinutes());
        var st_hr = parseInt(start_time.split(':')[0]);
        var st_min = parseInt(start_time.split(':')[1]);
        var en_hr = parseInt(end_time.split(':')[0]);
        var en_min = parseInt(end_time.split(':')[1]);
        
        const m = date.split('-')[1];
        const d = date.split('-')[2];
        const y = date.split('-')[0];
        var cd = current_date.getDate();
        var cm = current_date.getMonth();
        cm += 1;
        var cy = current_date.getFullYear();
        if (cd<10)
            cd = "0" + cd;
        if (cm<10)
            cm = "0" + cm;
            
        
        if (y >= cy && m >= cm && d >= cd) {
           
            if (y == cy && m == cm && d == cd) {
                if (st_hr * 60 + st_min >= current_hour * 60 + current_min && en_hr * 60 + en_min > st_hr * 60 + st_min)
                    console.log("interview sechdule")
                else
                    return res.status(200).json({ mess: "Invalid Time" });
            }
            else {
                console.log("interview sechdule")
            }
            
        }
        else
                return res.status(200).json({ mess: "Invalid Date" });
        var check = 1;
        if (interview)
        {
            
            for (participants of interviewer)
            {
                
                const user = await User.findOne({ email: participants });
                if (user)
                {
                   
                    const idx = user.interview_schedule.indexOf(interview.id);
                    
                    if (idx != -1)
                    {
                        user.interview_schedule.splice(idx, 1);
                        user.save();
                    }
                    
                }
                
            }
            interview.participants.splice(0, participants.length);
            
            }
        for ( participants of interviewer)
        {
            
            if (check == 0)
                break;
            
            const user = await User.findOne({ email: participants }).
                populate('interview_schedule');
            if (user)
            {
              
                var array = user.interview_schedule;
                
                for (let s = 0; s < array.length;s++)
                {
                   
                    if (array[s].date == date)
                    {
                        
                        var s_hr = parseInt(array[s].start_time.split(':')[0]);
                        var s_min = parseInt(array[s].start_time.split(':')[1]);
                        var e_hr = parseInt(array[s].end_time.split(':')[0]);
                        var e_min = parseInt(array[s].end_time.split(':')[1]);
                        var x = s_hr * 60 + s_min;
                        var yy = e_hr * 60 + e_min;
                        var ss_hr = parseInt(start_time.split(':')[0]);
                        var ss_min = parseInt(start_time.split(':')[1]);
                        var ee_hr = parseInt(end_time.split(':')[0]);
                        var ee_min = parseInt(end_time.split(':')[1]);
                        var mm = ss_hr * 60 + ss_min;
                        var n = ee_hr * 60 + ee_min;
                        
                        if ((x <= mm && yy >= mm) || (x <= n && yy >= n) || (yy<= n && x >=mm)) {
                            
                            check = 0;
                            break;
                        }

                            
                        }
                }
                }
            
         
        }
        
        if (check == false)
            return res.json({ mess: "Some of the Participants already has an interview.Please reschedule the interview" });
            
        
        if (interview) {
               
               for (let participants of interviewer) { 
                        const user = await User.findOne({ email: participants });
                   if (user) {
                            
                            user.interview_schedule.push(interview);
                       user.save();
                      
                            interview.participants.push(user);
                            
                              Mailer.updatescheduler(user,date,start_time,end_time);
                        }
                                
            }
            interview.date = date;
            interview.start_time = start_time;
            interview.end_time = end_time;
            
            interview.save();
                        
                    }

               
        return res.status(200).json({ mess: "Interview is re-scheduled" });
    }
    catch(err)
    {
        console.log(err);
        return res.status(200).json({ mess: "Interview cannot be scheduled" });
    }
}
    

module.exports.delete = async (req, res) =>
{
    try {
        const id = req.params.id;
        const interview = await Interview.findOne({ _id: id });
        if (interview)
        {
            
            for (participant of interview.participants)
            {
                const user = await User.findOne({ _id: participant })

                if (user)
                {
                    
                   
                    const idx = user.interview_schedule.indexOf(interview._id)
                    if (idx != -1) {
                        Mailer.deletescheduler(user, interview);
                        user.interview_schedule.splice(idx, 1);
                        user.save();
                    }
                }
            }
            interview.remove();
            
        }
        return res.json({ mess: "Schedule successfully deleted." });

    }
    catch (err)
    {
        console.log(err);
        return res.json({mess:"Schedule can't be deleted. Please try again."})
    }

}