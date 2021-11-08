import React, { useState, useEffect } from "react"
import Header from './Header'
import Axios from "axios"
import Upcoming from "./Upcoming";
import Past from "./Past"
import BasicCard from "./Card";



function Home() {
    // const [present, setPresent] = useState([])
    // const [upcoming, setUpcoming] = useState([]);
    // const [past, setPast] = useState([]);
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
                    //setPast([...past, schedule]);
                    past.push(schedule);
                    
                }
                else if (current_hour * 60 + current_min < en_hr * 60 + en_min && current_hour * 60 + current_min < st_hr * 60 + st_min) {
                    
                    //setUpcoming([...upcoming, schedule]);
                    upcoming.push(schedule);
                }
                else if (current_hour * 60 + current_min < en_hr * 60 + en_min && current_hour * 60 + current_min > st_hr * 60 + st_min) {
                    //setPresent([...present, schedule]);
                    present.push(schedule);
                }
            }
            else if (y < cy) {
                past.push(schedule);
               // setPast([...past, schedule]);
            }
            else if (y == cy && m < cm) {
                past.push(schedule);
                //setPast([...past, schedule]);
                // return -1
            }
            else if (y == cy && m == cm && d < cd) {
                past.push(schedule);
               // setPast([...past, schedule]);
                // return -1
            }
            else if (y > cy) {
                upcoming.push(schedule);
                
               // setUpcoming([...upcoming, schedule]);
                // return 1;

            }
            else if (y == cy && m > cm) {
                upcoming.push(schedule);
                //setUpcoming([...upcoming, schedule]);
                // return 1;
            }
            else if (y == cy && m == cm && d > cd) {
                
               // setUpcoming([...upcoming, schedule]);
                upcoming.push(schedule);
                // return 1;
            }
        
    }
    const fetched = async () => {
        const res = await Axios.get("http://localhost:5000/user/getSchedule")
    
            var value = res.data.interview_schedule;
        setstorage(value);
        
    }
    
    useEffect(() => {
         console.log("abc");
       
        fetched();
        
            // .catch(err => {
            // console.log(err);
            //   })
    }, [counter])
    console.log(storage.length);
    if (storage.length)
    {
        
        for (let i = 0; i < storage.length; i++)
        {
            display(storage[i]);
            //console.log(storage[i].date);

        }
    }
    //console.log("dddd",counter);
    //console.log(storage);
    console.log("present",present);
    console.log("upcoming",upcoming);
    console.log("past",past);
    return (
        <div>
            <Header />
            <div className="maindiv">
            
            <h2>Upcoming Interview</h2>
                {   
                upcoming.map(schedule=>(<BasicCard schedule={schedule}/>))
                }
            
            
            <h2>Past Interview</h2>
                {
                past.map(schedule=>(<BasicCard schedule={schedule}/>))
                }
            
            
            <h2>Present Interview</h2>
                {
                present.map(schedule=>(<BasicCard schedule={schedule}/>))
                }
               
            </div>
            {/* <BasicCard/> */}
            {/* {storage && storage.map(schedule =>(display(schedule)  ))} */}
        </div>
    )
}

export default Home

