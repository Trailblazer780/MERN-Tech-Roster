import React from 'react';
import './DeleteTechnology.scss';
import {ComponentProps, Technology, Course} from './../tools/data.model';
import { Button, Form } from 'react-bootstrap';
import { sendJSONData, deleteJSONData} from '../tools/Toolkit';
import { useParams } from 'react-router-dom';
import {Link} from 'react-router-dom';

const DELETE_TECHNOLOGY = "http://localhost:8080/deletetech";

const DeleteTechnology = ({technologies, reRender}:ComponentProps) => {

    // Get id from url
    let { id } = useParams<{ id: string }>();
    // Check the id 
    console.log("recived id: " + id);
    // Get the technology data
    let technology:(Technology|undefined) = technologies.find(item => item._id === id);

    const onResponse  = () => {
        console.log("*** Successfully deleted technology");
        window.location.href = "/";
        reRender();
    }

    const onError = () => console.log("*** Error has occured during AJAX data transmission");

    const onDelete = () => {
        console.log("Delete id: " + id);
        // make json string to send with the id 
        let jsonString = JSON.stringify({_id: id});
        console.log("jsonString: " + jsonString);
        deleteJSONData(DELETE_TECHNOLOGY, jsonString, onResponse, onError);
    };

    return (
        (technology === undefined) ?
            <div>
                <h1>Technology not found</h1>
                <Link to="/">Back to home</Link>
            </div>
        :
            <div>
                <h1>Delete Technology</h1>
                <div className="mb-3">Are you sure you want to delete the following technology?</div>
                <div className="mb-3">{technology.name}</div>

                <Button variant="success" onClick={onDelete}>Ok</Button>{' '}
                <Link to={`/`}><Button variant="secondary">Cancel</Button>{' '}</Link>
            </div>
    )

}

export default DeleteTechnology;