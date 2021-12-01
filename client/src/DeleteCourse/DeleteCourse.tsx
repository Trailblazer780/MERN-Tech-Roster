import React from 'react';
import './DeleteCourse.scss';
import {ComponentProps, Technology, Course, DeleteCourseProps} from './../tools/data.model';
import { Button, Form } from 'react-bootstrap';
import { sendJSONData, deleteJSONData} from '../tools/Toolkit';
import { useParams } from 'react-router-dom';
import {Link} from 'react-router-dom';

const DELETE_TECHNOLOGY = "http://localhost:8080/deletecourse";

const DeleteCourse = ({technologies, courses, reRender}:DeleteCourseProps) => {

    // Get id from url
    let { id } = useParams<{ id: string }>();
    // Check the id 
    console.log("recived id: " + id);
    // Get the technology data
    let course:(Course|undefined) = courses.find(item => item._id === id);

    const onResponse  = () => {
        console.log("*** Successfully deleted course");
        window.location.href = "/";
        reRender();
    }

    const onError = () => console.log("*** Error has occured during AJAX data transmission");

    const onDelete = () => {
        console.log("Delete course id: " + id);
        // make json string to send with the id 
        let jsonString = JSON.stringify({_id: id});
        console.log("jsonString: " + jsonString);
        deleteJSONData(DELETE_TECHNOLOGY, jsonString, onResponse, onError);
    };

    return (
        (course === undefined) ?
            <div>
                <h1>Course not found</h1>
                <Link to="/"><Button variant="success">Back to home</Button></Link>
            </div>
        :
            <div>
                <h1>Delete Technology</h1>
                <div className="mb-3">Are you sure you want to delete the following course?</div>
                <div className="mb-3"> {course.code} {course.name}</div>

                <Button variant="success" onClick={onDelete}>Ok</Button>{' '}
                <Link to={`/`}><Button variant="secondary">Cancel</Button>{' '}</Link>
            </div>
    )

}

export default DeleteCourse;