import React, { useState,useEffect}from 'react';
import Axios from "axios"
import { BrowserRouter, Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import Home from './components/Home';
import Interview_Shcedule from './components/Interview_Shcedule';
function App() {
  const [interviewers, setInterviewers] = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:5000/user/getUser").then((res) => {
        // console.log(res);
        setInterviewers(res.data.user)
    }).catch((err) => {
        console.log(err);
    })
}, [])
  return (
    <BrowserRouter>
    <Switch>
        <Route exact path="/"><Home interviewers={ interviewers}/></Route>
        <Route exact path="/schedule"><Interview_Shcedule interviewers={interviewers}/></Route>
    </Switch>
  </BrowserRouter>
  );
}

export default App;
