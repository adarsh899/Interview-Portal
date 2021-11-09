import React, { useState, useEffect } from "react"
import Header from './Header'
import Axios from "axios"
import BasicCard from "./Card";
import { Skeleton, Typography } from "@mui/material";



function Home({interviewers}) {
    
    let past = [];
    let upcoming = [];
    let present = [];
     
    
    const [counter, setcounter] = useState(0);
    const [storage, setstorage] = useState([]);
    const  display = (schedule)=>
    {
            
             console.log('schedule', schedule);
            const date = schedule.date;
            const start_time = schedule.start_time;
            const end_time = schedule.end_time;
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
            if (cd < 10)
                cd = "0" + cd;
            if (cm < 10)
                cm = "0" + cm;
    
            if (y == cy && m == cm && d == cd) {
                if (current_hour * 60 + current_min > en_hr * 60 + en_min && current_hour * 60 + current_min > st_hr * 60 + st_min) {
                    past.push(schedule);
                    
                }
                else if (current_hour * 60 + current_min < en_hr * 60 + en_min && current_hour * 60 + current_min < st_hr * 60 + st_min) {
                    
                    upcoming.push(schedule);
                }
                else if (current_hour * 60 + current_min <= en_hr * 60 + en_min && current_hour * 60 + current_min >= st_hr * 60 + st_min) {
                    present.push(schedule);
                }
            }
            else if (y < cy) {
                past.push(schedule);
            }
            else if (y == cy && m < cm) {
                past.push(schedule);
            }
            else if (y == cy && m == cm && d < cd) {
                past.push(schedule);
            }
            else if (y > cy) {
                upcoming.push(schedule);
                
            }
            else if (y == cy && m > cm) {
                upcoming.push(schedule);
            }
            else if (y == cy && m == cm && d > cd) {
                
                upcoming.push(schedule);
                
            }
        
    }
    const fetched = async () => {
        const res = await Axios.get("http://localhost:5000/user/getSchedule")
    
            var value = res.data.interview_schedule;
        setstorage(value);
        
    }
    
    useEffect(() => {
         
        fetched();
        
    }, [counter])
    
    if (storage.length)
    {
        
        for (let i = 0; i < storage.length; i++)
        {
            display(storage[i]);

        }
    }
    
    return (
        <div>
            <Header />
            {storage.length == 0 ? (
                <div className="maindiv">
            <div>
                <Typography  variant="h5" style={{textAlign:"center", padding:20}}>Past Interview</Typography>
                        <Skeleton variant="rectangular" width={250} height={180} ></Skeleton>
                        <br/>
                        <Skeleton variant="rectangular" width={250} height={180} ></Skeleton>
                        <br/>
                        <Skeleton variant="rectangular" width = {250} height = {180} ></Skeleton>
                </div>
                <div>
                <Typography  variant="h5" style={{textAlign:"center", padding:20}}>Present Interview</Typography>
                        <Skeleton variant="rectangular" width={250} height={180} ></Skeleton>
                        <br/>
                        <Skeleton variant="rectangular" width={250} height={180} ></Skeleton>
                        <br/>
                        <Skeleton variant="rectangular" width = {250} height = {180} ></Skeleton>
                </div>
            <div>
            <Typography  variant="h5" style={{textAlign:"center", padding:20}} >Upcoming Interview </Typography>
                        <Skeleton variant="rectangular" width={250} height={180} ></Skeleton>
                        <br/>
                        <Skeleton variant="rectangular" width={250} height={180} ></Skeleton>
                        <br/>
                        <Skeleton variant="rectangular" width = {250} height = {180} ></Skeleton>
                </div>
                
                
            </div>
            ) : (
                <div className="maindiv">
            <div>
                <Typography  variant="h5" style={{textAlign:"center", padding:20}}>Past Interview</Typography>
                {
                    past.length>0?past.map(schedule=>(<BasicCard key= {schedule.id} schedule={schedule} interviewers={interviewers}/>)):(<Typography  variant="body5" style={{textAlign:"center", padding:20}}>No Past Interviews</Typography>)
                }
            </div>
            <div>
                <Typography  variant="h5" style={{textAlign:"center", padding:20}}>Present Interview</Typography>
                {
                    present.length>0?present.map(schedule=>(<BasicCard key= {schedule.id} schedule={schedule} interviewers={interviewers}/>)):(<Typography  variant="body5" style={{textAlign:"center", padding:20}}>No Interviews going on</Typography>)
                    
                }
            </div>
            <div>
            <Typography  variant="h5" style={{textAlign:"center", padding:20}} >Upcoming Interview </Typography>
                {
                    upcoming.length>0?upcoming.map(schedule => (<BasicCard key={schedule.id} schedule={schedule} interviewers={interviewers}/>)):(<Typography  variant="body5" style={{textAlign:"center", padding:20}}>No Upcoming Interviews</Typography>)
                }
            </div>
                
                
            </div>
            )}
            
            
        </div>
    )
}

export default Home

