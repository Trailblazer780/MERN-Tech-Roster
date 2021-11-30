import React from 'react';
import { Button, Form } from 'react-bootstrap';
import './EditCourse.scss';
import {Technology, Course, EditProps} from './../tools/data.model';
import { sendJSONData, getJSONData, putJSONData } from '../tools/Toolkit';
import { useParams } from 'react-router-dom';
import {Link} from 'react-router-dom';

const EDIT_COURSE_SCRIPT = "http://localhost:8080/editcourse";

const EditCourse = ({technologies, courses, reRender}:EditProps) => {

    let { id } = useParams<{ id: string }>();

    const onResponse  = () => {
        console.log("*** Successfully edited technology");
        window.location.href = "/";
        reRender();
    }

    const onError = () => console.log("*** Error has occured during AJAX data transmission");

    const submitEditCourse = (e: any) => {
        let jsonString = JSON.stringify({_id: id, name: name});
        console.log("jsonString: " + jsonString);
        putJSONData(EDIT_COURSE_SCRIPT, jsonString, onResponse, onError);
    }

    let course:(Course|undefined) = courses.find(item => item._id === id);


    // -------------------------------------------------- State Variables -------------------------------------------------

    if (course === undefined) {
        return <div>
            <h1>Technology not found</h1>
            <Link to="/">Back to home</Link>
        </div>
    }

    let name = course.name;
    let code = course.code;

    // -------------------------------------------------- Event Handlers --------------------------------------------------
    
    const handleNameChange = (e: any) => {
        name = e;
        console.log(name);
    }


    return (
        (course === undefined) ?
            <div>
                <h1>Course not found</h1>
                <Link to="/">Back to home</Link>
            </div>
        :
            <div>
                <h1>Edit Course:</h1><br></br>
                <Form>
                    <Form.Group className="mb-3" controlId="newTechForm.Name">
                        <Form.Label>Course Code:</Form.Label>
                        <Form.Control type="text" disabled placeholder="Name" defaultValue={course.code}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="newTechForm.Description">
                        <Form.Label>Name:</Form.Label>
                        <Form.Control type="text" defaultValue={course.name} onChange={(e:any) => handleNameChange(e.target.value)}/>
                    </Form.Group>
                </Form>
                <Button variant="success" onClick={(e:any) => {submitEditCourse(e);}}>Ok</Button>{' '}
                <Link to={`/`}><Button variant="secondary">Cancel</Button>{' '}</Link>
            </div>
    )
    
}

export default EditCourse;