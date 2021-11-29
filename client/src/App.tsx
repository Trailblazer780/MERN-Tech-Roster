import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.scss';
import { getJSONData } from "./tools/Toolkit";
import { Course, JSONDataTech, JSONDataCourse, Technology } from "./tools/data.model";
import LoadingOverlay from "./LoadingOverlay/LoadingOverlay";
import Home from "./Home/Home";
import DeleteTechnology from "./DeleteTechnology/DeleteTechnology";
import Error from "./Error/Error";
import AddTechnology from './AddTechnology/AddTechnology';


const RETRIEVE_SCRIPT_TECH:string = "http://localhost:8080/gettech";
const RETRIEVE_SCRIPT_COURSE:string = "http://localhost:8080/getcourses";

function App() {


  // ---------------------------------------------- event handlers

  const onResponseTech = (result:JSONDataTech) => {
    setTechnologies(result.technologies);
    console.log(result.technologies);
    setLoading(false);
  };
  const onResponseCourse = (result:JSONDataCourse) => {
    setCourses(result.courses);
    console.log(result.courses);
    setLoading(false);
  };

  const onError = () => console.log("*** Error has occured during AJAX data transmission");

  // ---------------------------------------------- lifecycle hooks
  React.useEffect(() => {getJSONData(RETRIEVE_SCRIPT_TECH, onResponseTech, onError);}, []);
  React.useEffect(() => {getJSONData(RETRIEVE_SCRIPT_COURSE, onResponseCourse, onError);}, []);

  // -------------------------------------------------- State Setup --------------------------------------------------
  // Setting technologies array
  const [technologies, setTechnologies] = React.useState<Technology[]>([]);
  // Setting courses array
  const [courses, setCourses] = React.useState<Course[]>([]);
  // Loading Overlay
  const [loading, setLoading] = React.useState<boolean>(true); 

  return (
    <div className="main">
      <LoadingOverlay bgColor="#a72f57" spinnerColor="#FFFFFF" enabled={loading} />

      <div className="header">_Technology Roster -- Admin</div>
      {(technologies.length > 0) ?
      <Switch>

        <Route path="/" render={()=><Home technologies={technologies}/>} exact/>
        <Route path="/AddTechnology" render={()=><AddTechnology courses={courses}/>} exact/>
        <Route path="/deletetechnology/:id" render={()=><DeleteTechnology technologies={technologies}/> } exact/>
        <Route render={()=><Error/>}/>

      </Switch>
      : 
      <div>There are currently no technologies and courses in the database </div>}
      <div className="footer">Web App powered by MERN Stack</div>
    </div>
  );
}

export default App;
