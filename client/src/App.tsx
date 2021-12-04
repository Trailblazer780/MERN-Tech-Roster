import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.scss';
import { getJSONData } from "./tools/Toolkit";
import { Course, JSONDataTech, Technology} from "./tools/data.model";
import LoadingOverlay from "./LoadingOverlay/LoadingOverlay";
import Home from "./Home/Home";
import DeleteTechnology from "./DeleteTechnology/DeleteTechnology";
import EditTechnology from "./EditTechnology/EditTechnology";
import Error from "./Error/Error";
import AddTechnology from './AddTechnology/AddTechnology';
import AddCourse from './AddCourse/AddCourse';
import EditCourse from './EditCourse/EditCourse';
import DeleteCourse from './DeleteCourse/DeleteCourse';


const RETRIEVE_SCRIPT_TECH:string = "/get";

function App() {


  // ---------------------------------------------- event handlers ----------------------------------------------

  const onResponseTech = (result:JSONDataTech) => {
    setTechnologies(result.technologies);
    setCourses(result.courses);
    console.log(result.technologies);
    setLoading(false);
  };

  const onError = () => console.log("*** Error has occured during AJAX data transmission");

  const reRender = () => {
    getJSONData(RETRIEVE_SCRIPT_TECH, onResponseTech, onError);
  }

  // ---------------------------------------------- lifecycle hooks ----------------------------------------------
  React.useEffect(() => {reRender();}, []);

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
      <Switch>

        <Route path="/" render={()=><Home technologies={technologies} courses={courses} reRender={reRender}/>} exact/>
        <Route path="/AddTechnology" render={()=><AddTechnology courses={courses} reRender={reRender}/>} exact/>
        <Route path="/addcourse" render={()=><AddCourse courses={courses} reRender={reRender}/>} exact/>
        <Route path="/deletetechnology/:id" render={()=><DeleteTechnology technologies={technologies} reRender={reRender}/> } exact/>
        <Route path="/deletecourse/:id" render={()=><DeleteCourse technologies={technologies} courses={courses} reRender={reRender}/> } exact/>
        <Route path="/edittechnology/:id" render={()=><EditTechnology technologies={technologies} courses={courses} reRender={reRender}/>} exact/>
        <Route path="/editcourse/:id" render={()=><EditCourse technologies={technologies} courses={courses} reRender={reRender}/>} exact/>
        <Route render={()=><Error/>}/>

      </Switch>
      <div className="footer">Web App powered by MERN Stack</div>
    </div>
  );
}

export default App;
