import React from 'react';
import './DeleteTechnology.scss';
import {ComponentProps, Technology, Course} from './../tools/data.model';
import { Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import {Link} from 'react-router-dom';

const DeleteTechnology = ({technologies}:ComponentProps) => {

    // Get id from url
    let { id } = useParams<{ id: string }>();
    // Check the id 
    console.log("recived id: " + id);
    // Get the technology data
    let technology:(Technology|undefined) = technologies.find(item => item._id === id);

    const onDelete = () => {
        console.log("Delete id: " + id);
    };


    if (technology === undefined) {
        return <div>
            <h1>Technology not found</h1>
            <Link to="/">Back to home</Link>
        </div>
    }

    return (
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