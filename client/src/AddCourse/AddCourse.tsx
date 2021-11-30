import React from 'react';
import { Button, Form } from 'react-bootstrap';
import './AddCourse.scss';
import {ComponentProps, CourseProps, Technology, Course} from './../tools/data.model';
import { sendJSONData } from '../tools/Toolkit';
import {Link} from 'react-router-dom';

const ADD_TECHNOLOGY_SCRIPT = "http://localhost:8080/addcourse";

const AddCourse = ({courses, reRender}:CourseProps) => {


    const onResponse  = () => {
        console.log("*** Successfully edited technology");
        window.location.href = "/";
        reRender();
    }

    const onError = () => console.log("*** Error has occured during AJAX data transmission");

    const submitCourse = (e: any) => {
        console.log("name" + name);
        console.log("code" + code);
        let jsonString = JSON.stringify({ code: code, name: name});
        console.log("jsonString: " + jsonString);
        sendJSONData(ADD_TECHNOLOGY_SCRIPT, jsonString, onResponse, onError);
    }

    // -------------------------------------------------- State Variables -------------------------------------------------
    const [name, setName] = React.useState<string>("");
    const [code, setCode] = React.useState<string>("");

    // -------------------------------------------------- Event Handlers --------------------------------------------------

    const handleCodeChange = (e: any) => {
        setCode(e);
        console.log(code);
    }
    
    const handleNameChange = (e: any) => {
        setName(e);
        console.log(name);
    }


    return (
        <div>
            <h1>Add Course:</h1><br></br>
            <Form>
                <Form.Group className="mb-3" controlId="newTechForm.Name">
                    <Form.Label>Course Code:</Form.Label>
                    <Form.Control type="text" placeholder="Code" value={code} onChange={(e:any) => handleCodeChange(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="newTechForm.Description">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control type="text" placeholder="Name" value={name} onChange={(e:any) => handleNameChange(e.target.value)}/>
                </Form.Group>
            </Form>
            <Button variant="success" onClick={(e:any) => {submitCourse(e);}}>Ok</Button>{' '}
            <Link to={`/`}><Button variant="secondary">Cancel</Button>{' '}</Link>
        </div>
    )
    
}

export default AddCourse;