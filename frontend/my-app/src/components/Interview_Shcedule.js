import React,{useState,useEffect} from 'react'
import Select from 'react-select';
import makeAnimated from "react-select/animated";
import Axios from "axios"
import Header from './Header';
import { useHistory } from "react-router-dom";

function Interview_Shcedule() {

    const animatedComponents = makeAnimated();
    const [date, setDate] = useState("");
    const [start_time, setStartTime] = useState("");
    const [end_time, setEndTime] = useState("");
    const [email, setEmail] = useState([]);
    const [interviewers, setInterviewers] = useState([]);
    const [counter, setCounter] = useState(0);
    const history = useHistory();
    console.log("counter", counter);
    console.log(email);
    useEffect(() => {
        Axios.get("http://localhost:5000/user/getUser").then((res) => {
            // console.log(res);
            setInterviewers(res.data.user)
        }).catch((err) => {
            console.log(err);
        })
    }, [])
    const getOptions = (data) => {
        console.log(data);
        const options = [];
        for (let d of data) {
          options.push({ label: d.email, value: d.email });
        }
        return options;
      };
    console.log(interviewers);

        
    function inputData(e)
    {
        e.preventDefault();
        
        
        Axios.post("http://localhost:5000/user/schedule", {date,start_time,end_time,email})
            .then(res => {
                // console.log(res);
                alert(res.data.mess);
            });
         history.push("/");
        

    }
    return (
        
        <div>
            <Header/>
            <h1>Schedule the Interview</h1>
            <div className="SignUp">
            <form className="SignUp_form" onSubmit={inputData}>
                
            <label>Choose Date : </label>
                    <input type="date" placeholder="DD-MM-YY" required value={date} onChange={ (e)=>setDate(e.target.value)}/>
                    <label>Start Time : </label>
                    <input type="time" placeholder="HH:MM" required value={start_time} onChange={ (e)=>setStartTime(e.target.value)}/>
                    <label>End Time : </label>
                    <input type="time" placeholder="HH:MM" required value={end_time} onChange={ (e)=>setEndTime(e.target.value)}/>
                    <label>Select Interviewee : </label>
                    <Select
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        isMulti
                        options={getOptions(interviewers)}
                        onChange={(selectedOption) => {
                            setEmail([...email,selectedOption[counter].value]);
                            setCounter(counter + 1);
                            
              console.log("candidates selected", selectedOption);
            }}
                        />
                    
                    <br></br>
                <button>Schedule</button>
            </form>
        </div>
        </div>
    )
}

export default Interview_Shcedule
