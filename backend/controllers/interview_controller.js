const Interview = require('../model/interview_schedule');
const User = require('../model/user');
const Mailer = require('../Mailing/schedule_mailer');
module.exports.schedule = async function (req, res)
{
    try
    {
        console.log("*****************************");
        console.log(req.body);
        const interviewer = req.body.email;
        // console.log(req.body);
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
        // console.log(current_hour, current_min);
        // console.log(st_hr, st_min);
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
            console.log(y, cy, m, cm, d, cd);
        console.log(st_hr * 60 + st_min, current_hour * 60 + current_min);
        if (y >= cy && m >= cm && d >= cd) {
            console.log(y, cy, m, cm, d, cd);
            if (y == cy && m == cm && d == cd) {
                if (st_hr * 60 + st_min >= current_hour * 60 + current_min && en_hr * 60 + en_min > st_hr * 60 + st_min)
                    console.log("interview sechdule")
                else
                    return res.status(200).json({ mess: "Interview cannot be shedule" });
            }
            else {
                console.log("interview sechdule")
            }
            
        }
        else
                return res.status(200).json({ mess: "Interview cannot be shedule" });
        var check = 1;
        
        for ( participants of interviewer)
        {
            
            console.log(participants);
            if (check == 0)
                break;
            // console.log((participants));
            const user = await User.findOne({ email: participants }).
                populate('interview_schedule');
            if (user)
            {
                //console.log("uu", user);
                var array = user.interview_schedule;
                
                for (let s = 0; s < array.length;s++)
                {
                    console.log("firat2");
                    if (array[s].date == date)
                    {
                        console.log(array[s].start_time, array[s].end_time);
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
                        console.log(x, yy, mm, n);
                        if ((x <= mm && yy >= mm) || (x <= n && yy >= n) || (yy<= n && x >=mm)) {
                            console.log("aaya");
                            check = 0;
                            break;
                        }

                            
                        }
                }
                }
            
         
        }
        console.log("checking", check);
        if (check == false)
            return res.json({ mess: "reshedule your time" });
            
        const interview = await Interview.create({ date: date, start_time: start_time, end_time: end_time });
        if (interview) {
               
               for (let participants of interviewer) { 
                        const user = await User.findOne({ email: participants });
                   if (user) {
                            
                            user.interview_schedule.push(interview);
                       user.save();
                       console.log("user=>", user);
                            interview.participants.push(user);
                            
                            Mailer.scheduler(participants);
                        }
                                
            }
            interview.save();
                        
                    }

               
        return res.status(200).json({ mess: "interview schedule created" });
    }
    catch(err)
    {
        console.log(err);
        return res.status(200).json({ mess: "interview schedule not created" });
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
// module.exports.update = async(req, res) =>
// {
//     try
//     {
//         console.log("*****************************");
//         console.log(req.body);
//         const interviewer = req.body.email;
//         // console.log(req.body);
//         const date = req.body.date;
//         const start_time = req.body.start_time;
//         const end_time = req.body.end_time;
//         const current_date = new Date();
//         var current_hour = parseInt(current_date.getHours());
//         var current_min = parseInt(current_date.getMinutes());
//         var st_hr = parseInt(start_time.split(':')[0]);
//         var st_min = parseInt(start_time.split(':')[1]);
//         var en_hr = parseInt(end_time.split(':')[0]);
//         var en_min = parseInt(end_time.split(':')[1]);
//         // console.log(current_hour, current_min);
//         // console.log(st_hr, st_min);
//         const m = date.split('-')[1];
//         const d = date.split('-')[2];
//         const y = date.split('-')[0];
//         var cd = current_date.getDate();
//         var cm = current_date.getMonth();
//         cm += 1;
//         var cy = current_date.getFullYear();
//         if (cd<10)
//             cd = "0" + cd;
//         if (cm<10)
//             cm = "0" + cm;
//             console.log(y, cy, m, cm, d, cd);
//         console.log(st_hr * 60 + st_min, current_hour * 60 + current_min);
//         if (y >= cy && m >= cm && d >= cd) {
//             console.log(y, cy, m, cm, d, cd);
//             if (y == cy && m == cm && d == cd) {
//                 if (st_hr * 60 + st_min >= current_hour * 60 + current_min && en_hr * 60 + en_min > st_hr * 60 + st_min)
//                     console.log("interview sechdule")
//                 else
//                     return res.status(200).json({ mess: "Interview cannot be shedule" });
//             }
//             else {
//                 console.log("interview sechdule")
//             }
            
//         }
//         else
//                 return res.status(200).json({ mess: "Interview cannot be shedule" });
//         var check = 1;
        
//         for ( participants of interviewer)
//         {
            
//             console.log(participants);
//             if (check == 0)
//                 break;
//             // console.log((participants));
//             const user = await User.findOne({ email: participants }).
//                 populate('interview_schedule');
//             if (user)
//             {
//                 //console.log("uu", user);
//                 var array = user.interview_schedule;
                
//                 for (let s = 0; s < array.length;s++)
//                 {
//                     console.log("firat2");
//                     if (array[s].date == date)
//                     {
//                         console.log(array[s].start_time, array[s].end_time);
//                         var s_hr = parseInt(array[s].start_time.split(':')[0]);
//                         var s_min = parseInt(array[s].start_time.split(':')[1]);
//                         var e_hr = parseInt(array[s].end_time.split(':')[0]);
//                         var e_min = parseInt(array[s].end_time.split(':')[1]);
//                         var x = s_hr * 60 + s_min;
//                         var yy = e_hr * 60 + e_min;
//                         var ss_hr = parseInt(start_time.split(':')[0]);
//                         var ss_min = parseInt(start_time.split(':')[1]);
//                         var ee_hr = parseInt(end_time.split(':')[0]);
//                         var ee_min = parseInt(end_time.split(':')[1]);
//                         var mm = ss_hr * 60 + ss_min;
//                         var n = ee_hr * 60 + ee_min;
//                         console.log(x, yy, mm, n);
//                         if ((x <= mm && yy >= mm) || (x <= n && yy >= n) || (yy<= n && x >=mm)) {
//                             console.log("aaya");
//                             check = 0;
//                             break;
//                         }

                            
//                         }
//                 }
//                 }
            
         
//         }
//         console.log("checking", check);
//         if (check == false)
//             return res.json({ mess: "reshedule your time" });
            
//         const interview = await Interview.create({ date: date, start_time: start_time, end_time: end_time });
//         if (interview) {
               
//                for (let participants of interviewer) { 
//                         const user = await User.findOne({ email: participants });
//                    if (user) {
                            
//                             user.interview_schedule.push(interview);
//                        user.save();
//                        console.log("user=>", user);
//                             interview.participants.push(user);
                            
//                             Mailer.scheduler(participants);
//                         }
                                
//             }
//             interview.save();
                        
//                     }

               
//         return res.status(200).json({ mess: "interview schedule created" });
//     }
//     catch(err)
//     {
//         console.log(err);
//         return res.status(200).json({ mess: "interview schedule not created" });
//     }
// }
    
