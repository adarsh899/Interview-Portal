import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import Home from './components/Home';
import Interview_Shcedule from './components/Interview_Shcedule';
function App() {
  return (
    <BrowserRouter>
    <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/schedule" component={Interview_Shcedule}/>
    </Switch>
  </BrowserRouter>
  );
}

export default App;
