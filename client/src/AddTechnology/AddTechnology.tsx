import React from 'react';
import { Button, Form } from 'react-bootstrap';
import './AddTechnology.scss';
import {CourseProps, Course} from './../tools/data.model';
import { sendJSONData } from '../tools/Toolkit';
import {Link} from 'react-router-dom';

const ADD_TECHNOLOGY_SCRIPT = "/addtech";
let name:string = "";
let description:string = "";
const AddTechnology = ({courses, reRender}:CourseProps) => {


    const onResponse  = () => {
        console.log("*** Successfully edited technology");
        window.location.href = "/";
        reRender();
    }

    const onError = () => console.log("*** Error has occured during AJAX data transmission");

    const submitTechnology = (e: any) => {
        let tempValues = values.map(value => {
            console.log("value: "+value);
            return courses.find(course => course._id === value);
        });

        let tempCourses = tempValues.map(course => {
            return {
                // make the course not possibly undefined
                code: course ? course.code : "",
                name: course ? course.name : ""
            }
        });

        let jsonString = JSON.stringify({name: name, description: description, difficulty: difficulty, courses: tempCourses});
        console.log("jsonString: " + jsonString);
        
        sendJSONData(ADD_TECHNOLOGY_SCRIPT, jsonString, onResponse, onError);
    }

    const getCheckedValues = (e: any) => {
        // seting values to empty array
        setValues([]);
        // Getting all of the checkboxes that are checked
        const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
        // Adding the ID's of the checked checkboxes to the values array
        checkboxes.forEach((checkbox) => {values.push(checkbox.id);});
    } 

    // -------------------------------------------------- Input Checking --------------------------------------------------
    const checkCode = () => {
        let x = document.getElementById("nameVerification");
        let y = document.getElementById("descVerification");
        let z = document.getElementById("btnOk");
        console.log("CheckingInputs");
        if (name === "" && description === ""){
            console.log("Empty");
            if(x !== null && y != null && z !== null){
                x.innerHTML = "Name is required";
                y.innerHTML = "Description is required";
                z.setAttribute("disabled", "disabled");
            }
        }
        else if (name !== "" && description === ""){
            if(x != null && y !== null && z !== null){
                x.innerHTML = "";
                y.innerHTML = "Description is required";
                z.setAttribute("disabled", "disabled");
            }
        }
        else if (name === "" && description !== ""){
            if(x != null && y !== null && z !== null){
                x.innerHTML = "Name is required";
                y.innerHTML = "";
                z.setAttribute("disabled", "disabled");
            }
        }
        else if (name !== "" && description !== ""){
            if(x != null && y !== null && z !== null){
                x.innerHTML = "";
                y.innerHTML = "";
                z.removeAttribute("disabled");
            }
        }

    }

    // -------------------------------------------------- State Variables -------------------------------------------------
    const [difficulty, setDifficulty] = React.useState<number>(1);
    const [values, setValues] = React.useState<string[]>([]);


    // -------------------------------------------------- Lifecylce Hooks --------------------------------------------------
    React.useEffect(() => {checkCode();}, []);

    // -------------------------------------------------- Event Handlers --------------------------------------------------

    const handleSelectChange = (e: any) => {
        setDifficulty(e);
        console.log(difficulty);
    }

    const handleDescChange = (e: any) => {
        description = e;
        checkCode();
        console.log(description);
    }   
    
    const handleNameChange = (e: any) => {
        name = e;
        checkCode();
        console.log(name);
    }


    return (
        <div>
            <h1>Add Technology:</h1><br></br>
            <Form>
                <Form.Group className="mb-3" controlId="newTechForm.Name">
                    <Form.Label>Technology Name:</Form.Label>
                    <Form.Control type="text" placeholder="Name" onChange={(e:any) => handleNameChange(e.target.value)}/>
                    <span id="nameVerification" className="text-danger"></span>
                </Form.Group>
                <Form.Group className="mb-3" controlId="newTechForm.Description">
                    <Form.Label>Technology Description</Form.Label>
                    <Form.Control as="textarea" placeholder="Description" rows={3} onChange={(e:any) => {handleDescChange(e.target.value); checkCode()}}/>
                    <span id="descVerification" className="text-danger"></span>
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
                        <Form.Check key={n} type="checkbox" label={data.code + " " + data.name} id={data._id}/>
                    )}
                </Form.Group>  
            </Form>
            <Button id="btnOk" variant="success" onClick={(e:any) => {getCheckedValues(e); submitTechnology(e);}}>Ok</Button>{' '}
            <Link to={`/`}><Button variant="secondary">Cancel</Button>{' '}</Link>
        </div>
    )
    
}

export default AddTechnology;