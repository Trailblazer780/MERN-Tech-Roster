import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.scss';
import { getJSONData } from "./tools/Toolkit";
import { JSONData, Technology } from "./tools/data.model";
import LoadingOverlay from "./LoadingOverlay/LoadingOverlay";
import Home from "./Home/Home";
import Error from "./Error/Error";
import AddTechnology from './AddTechnology/AddTechnology';


const RETRIEVE_SCRIPT:string = "http://localhost:8080/get";

function App() {


  // ---------------------------------------------- event handlers

  const onResponse = (result:JSONData) => {
    setTechnologies(result.technologies);
    console.log(result.technologies);
    setLoading(false);
  };

  const onError = () => console.log("*** Error has occured during AJAX data transmission");

  // ---------------------------------------------- lifecycle hooks
  React.useEffect(() => {getJSONData(RETRIEVE_SCRIPT, onResponse, onError);}, []);

  // -------------------------------------------------- State Setup --------------------------------------------------
  // Setting technologies array
  const [technologies, setTechnologies] = React.useState<Technology[]>([]);
  // Loading Overlay
  const [loading, setLoading] = React.useState<boolean>(true); 

  return (
    <div className="main">
      <LoadingOverlay bgColor="#a72f57" spinnerColor="#FFFFFF" enabled={loading} />

      <div className="header">_Technology Roster -- Admin</div>
      {(technologies.length > 0) ?
      <Switch>

        <Route path="/" render={()=><Home technologies={technologies}/>} exact/>
        <Route path="/AddTechnology" render={()=><AddTechnology/>} exact/>

        <Route render={()=><Error/>}/>

      </Switch>
      : 
      <div>There are currently no technologies and courses in the database </div>}
      <div className="footer">Web App powered by MERN Stack</div>
    </div>
  );
}

export default App;
