import React,{useState,useEffect} from 'react'
import Select from 'react-select';
import makeAnimated from "react-select/animated";
import Axios from "axios"
import Header from './Header';
import { useHistory } from "react-router-dom";
import Button from '@mui/material/Button';
import { Input } from '@mui/material';
import { Collapse } from '@mui/material'
import { Alert } from '@mui/material';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function Interview_Shcedule({interviewers}) {

    const animatedComponents = makeAnimated();
    const [date, setDate] = useState("");
    const [start_time, setStartTime] = useState("");
    const [end_time, setEndTime] = useState("");
    const [email, setEmail] = useState([]);
    const [counter, setCounter] = useState(0);
    const [message, setMessage] = useState("All fields are required.");
    const [open2, setOpen2] = React.useState(false);
    const history = useHistory();
    
    const getOptions = (data) => {
        const options = [];
        for (let d of data) {
          options.push({ label: d.email, value: d.email });
        }
        return options;
      };

        
    function inputData(e)
    {
        e.preventDefault();
        
        
        Axios.post("http://localhost:5000/user/schedule", {date,start_time,end_time,email})
            .then(res => {
                setMessage(res.data.mess);
            });
         
        

    }
    return (
        
        <div>
            <Header/>
            
            
            <form className="reschedule_modals" onSubmit={inputData}>
            <h3 style={{ textAlign: "center" }}>Schedule An Interview</h3> 
            <label>Choose Date : </label>
                    <Input fullWidth={true} sx={{marginBottom:2}} type="date" placeholder="DD-MM-YY" required value={date} onChange={ (e)=>setDate(e.target.value)}/>
                    <label>Start Time : </label>
                    <Input sx={{marginBottom:2}} type="time" placeholder="HH:MM" required value={start_time} onChange={ (e)=>setStartTime(e.target.value)}/>
                    <label>End Time : </label>
                    <Input sx={{marginBottom:2}} type="time" placeholder="HH:MM" required value={end_time} onChange={ (e)=>setEndTime(e.target.value)}/>
                    <label>Select Participants : </label>
                    <Select
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        isMulti
                        options={getOptions( interviewers )}
                        onChange={(selectedOption) => {
                            setEmail([...email,selectedOption[counter].value]);
                            setCounter(counter + 1);
                            
            }}
                        />
                    
                    <br></br>
                <Button type="Submit" variant="contained" onClick={() => { setOpen2(true);if(message == "Interview schedule created"){setTimeout(()=>{history.push("/")},500)}}}>Schedule</Button>
            </form>
            <Collapse in={open2}>
                <Alert
                    severity = "info"
             style={{ top:78,right:2, position:"absolute" }}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => setOpen2(false)}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            {message}
          </Alert>
        </Collapse>
        </div>

       
    )
}

export default Interview_Shcedule
