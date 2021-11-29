import React from 'react';
import { Button, Form } from 'react-bootstrap';
import './AddTechnology.scss';
import {ComponentProps, CourseProps, Technology, Course} from './../tools/data.model';
import {Link} from 'react-router-dom';

const SEND_SCRIPT_TECHNOLOGY:string = "http://localhost:8080"
const SEND_SCRIPT_GET_COURSE_DATA = "http://localhost:8080/getcourseinfo";


const AddTechnology = ({courses}:CourseProps) => {


    const submitTechnology = (e: any) => {
        console.log(name);
        console.log(description);
        console.log(difficulty);
        console.log(values);
    }

    const getCheckedValues = (e: any) => {
        // seting values to empty array
        setValues([]);
        // Getting all of the checkboxes that are checked
        const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
        // Adding the ID's of the checked checkboxes to the values array
        checkboxes.forEach((checkbox) => {values.push(checkbox.id);});
    } 

    // -------------------------------------------------- State Variables -------------------------------------------------
    const [name, setName] = React.useState<string>("");
    const [description, setDescription] = React.useState<string>("");
    const [difficulty, setDifficulty] = React.useState<number>(1);
    const [values, setValues] = React.useState<string[]>([]);

    // -------------------------------------------------- Event Handlers --------------------------------------------------
    const handleSelectChange = (e: any) => {
        setDifficulty(e);
        console.log(difficulty);
    }

    const handleDescChange = (e: any) => {
        setDescription(e);
        console.log(description);
    }   
    
    const handleNameChange = (e: any) => {
        setName(e);
        console.log(name);
    }


    return (
        <div>
            <h1>Add Technology:</h1><br></br>
            <Form>
                <Form.Group className="mb-3" controlId="newTechForm.Name">
                    <Form.Label>Technology Name:</Form.Label>
                    <Form.Control type="text" placeholder="Name" value={name} onChange={(e:any) => handleNameChange(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="newTechForm.Description">
                    <Form.Label>Technology Description</Form.Label>
                    <Form.Control as="textarea" placeholder="Description" rows={3} value={description} onChange={(e:any) => handleDescChange(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="newTechform.DifficultySelect">
                    <Form.Label>Select Difficulty</Form.Label>
                    <Form.Select onChange={(e:any) => handleSelectChange(e.target.value)}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </Form.Select>      
                </Form.Group>
                <Form.Group className="mb-3" controlId="newTechform.DifficultySelect">
                    <Form.Label>Used in courses:</Form.Label>
                    {courses.map((data:Course, n:number) => 
                        <Form.Check type="checkbox" label={data.code + " " + data.name} id={data._id}/>
                    )}
                </Form.Group>  
            </Form>
            <Button variant="success" onClick={(e:any) => {submitTechnology(e); getCheckedValues(e)}}>Ok</Button>{' '}
            <Link to={`/`}><Button variant="secondary">Cancel</Button>{' '}</Link>
        </div>
    )
    
}

export default AddTechnology;