import React , {useState} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Select from 'react-select';
import makeAnimated from "react-select/animated";
import { useHistory } from "react-router-dom";
import Button from '@mui/material/Button';
import { Input } from '@mui/material';
import Axios from "axios"
import { textAlign } from '@mui/system';
import { Collapse } from '@mui/material'
import { Alert } from '@mui/material';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


export default function ImgMediaCard({ schedule,interviewers }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [open2, setOpen2] = React.useState(false);
    const [message, setMessage] = useState("All fields are required.");
    const [open3, setOpen3] = React.useState(false);
    const handleOpen2 = () => setOpen2(true);
    const handleClose2 = () => setOpen2(false);
    const animatedComponents = makeAnimated();
    const [date, setDate] = useState("");
    const [start_time, setStartTime] = useState("");
    const [end_time, setEndTime] = useState("");
    const [email, setEmail] = useState([]);
    const [counter, setCounter] = useState(0);
    const history = useHistory();
    const getOptions = (data) => {
        console.log(data);
        const options = [];
        for (let d of data) {
          options.push({ label: d.email, value: d.email });
        }
        return options;
    };
    const updateSchedule = (e) =>
    {
        e.preventDefault();
        Axios.put(`http://localhost:5000/user/updateSchedule/${schedule._id}`,{date,start_time,end_time,email}).then((res) => {
             setMessage(res.data.mess)
            
        }).catch((err) => {
            console.log(err);
        })
    }
    const deleteSchedule = (e) =>
    {
        e.preventDefault();
        Axios.delete(`http://localhost:5000/user/deleteSchedule/${schedule._id}`).then((res) => {
             setMessage(res.data.mess)
            
        }).catch((err) => {
            console.log(err);
        })
        setOpen3(true)
        setTimeout(()=>{setOpen2(false)},500)
        
    }
  
    
    return (
            <Card  sx={{ maxWidth: 345,marginBottom:2 }}>
                
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Interview Scheduled
        </Typography>
        <Typography variant="body2" color="text.secondary">
                  Date: {schedule.date}
                  <br></br>
                  Start Time: {schedule.start_time}
                    <br></br>
                  End Time: {schedule.end_time}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleOpen2}>Edit</Button>
        <Button size="small" onClick={handleOpen}>Details</Button>
            </CardActions>
            <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
                <div className="form">
                <Typography gutterBottom variant="h5" component="div">
          Interview Scheduled
        </Typography>
                    <p>Date:{schedule.date}</p>
                    <p>Start Time: {schedule.start_time}</p>
                    <p>End Time: {schedule.end_time}</p>
                    <p>Participants : </p>
                    {schedule.participants.map(participant =>(<li>{participant.email}</li>))}
                    
                    
        </div>
            </Modal>
            <Modal
        keepMounted
        open={open2}
        onClose={handleClose2}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
            <form className="reschedule_modal" onSubmit={updateSchedule} >
                    <h3 style={{ textAlign: "center" }}>Re-Schedule an Interview</h3>
                    <br />
                    
            <label>Choose Date : </label>
                    <Input fullWidth={true} sx={{marginBottom:2}} type="date" placeholder="DD-MM-YY" required value={date} onChange={ (e)=>setDate(e.target.value)}/>
                    <label>Start Time : </label>
                    <Input sx={{marginBottom:2}}type="time" placeholder="HH:MM" required value={start_time} onChange={ (e)=>setStartTime(e.target.value)}/>
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
                            
              console.log("candidates selected", selectedOption);
            }}
                        />
                    
                    <br></br>
                    <Button type="Submit" variant="contained" onClick={() => { setOpen3(true) }}>Re Schedule</Button>
                    <br/>
                    <Button color="error" variant="contained" onClick={deleteSchedule}>Cancel Interview</Button>
                    <Collapse in={open3}>
                <Alert
                    severity = "info"
             style={{ top:2,right:2, position:"absolute" }}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => setOpen3(false)}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            {message}
          </Alert>
        </Collapse> 
            </form>
          
            </Modal>
            
            
                
    
    </Card>
        
  );
}
