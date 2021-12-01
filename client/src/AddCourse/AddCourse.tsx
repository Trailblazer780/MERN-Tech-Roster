import React from 'react';
import { Button, Form } from 'react-bootstrap';
import './AddCourse.scss';
import {ComponentProps, CourseProps, Technology, Course} from './../tools/data.model';
import { sendJSONData } from '../tools/Toolkit';
import {Link} from 'react-router-dom';

const ADD_TECHNOLOGY_SCRIPT = "http://localhost:8080/addcourse";
let array:String[] = [];
let codeValid:string = "false";
let code:string = "";
let name:string = "";
const AddCourse = ({courses, reRender}:CourseProps) => {
    
    const fillArray = () => {
        array = [];
        for (let i = 0; i < courses.length; i++) {
            array.push(courses[i].code.toLowerCase());
        }
    }

    fillArray();

    const onResponse  = () => {
        console.log("*** Successfully edited technology");
        window.location.href = "/";
        reRender();
    }

    const onError = () => console.log("*** Error has occured during AJAX data transmission");

    const submitCourse = () => {
        console.log("name" + name);
        console.log("code" + code);
        let jsonString = JSON.stringify({ code: code, name: name});
        console.log("jsonString: " + jsonString);
        sendJSONData(ADD_TECHNOLOGY_SCRIPT, jsonString, onResponse, onError);
    }

    const checkCode = () => {
        console.log("code: " + code);
        let x = document.getElementById("codeVerification");
        let y = document.getElementById("btnOk");
        let z = document.getElementById("nameVerification");
        if (array.includes(code.toLowerCase())) {
            codeValid = "false";
            if (x != null && y != null) {
                x.innerHTML = "Code already exists";
                y.setAttribute("disabled", "disabled");
            }
        }
        else if (array.includes(code.toLowerCase()) && name == "") {
            codeValid = "false";
            if (x != null && y != null && z != null) {
                x.innerHTML = "Code already exists";
                y.setAttribute("disabled", "disabled");
                z.innerHTML = "Name is required";
            }
        }
        else if (name == "" && code == "") {
            codeValid = "false";
            if (x != null && y != null && z != null) {
                x.innerHTML = "Code is required";
                y.setAttribute("disabled", "disabled");
                z.innerHTML = "Name is required";
            }
        }
        else if (code != "" && name == "") {
            codeValid = "false";
            if (x != null && y != null && z != null) {
                x.innerHTML = "";
                y.setAttribute("disabled", "disabled");
                z.innerHTML = "Name is required";
            }
        }
        else if (code == "" && name != "") {
            codeValid = "false";
            if (x != null && y != null && z != null) {
                x.innerHTML = "Code is required";
                y.setAttribute("disabled", "disabled");
                z.innerHTML = "";
            }
        }
        else if(name != "" && code != "" && array.includes(code.toLowerCase()) == false) {
            let x = document.getElementById("codeVerification");
            codeValid = "true";
            if (x != null && y != null && z != null) {
                x.innerHTML = "";
                y.removeAttribute("disabled");
                z.innerHTML = "";
            }
            console.log("codeValid: " + codeValid);
        }
    }

    React.useEffect(() => {checkCode();}, []);

    // -------------------------------------------------- Event Handlers --------------------------------------------------

    const handleCodeChange = (e: any) => {
        // setCode(e);
        code = e;
        checkCode();
        console.log(code);
    }
    
    const handleNameChange = (e: any) => {
        name = e;
        console.log(name);
    }

    return (
        <div>
            <h1>Add Course:</h1><br></br>
            <Form>
                <Form.Group className="mb-3" controlId="newTechForm.Name">
                    <Form.Label>Course Code:</Form.Label>
                    <Form.Control type="text" placeholder="Code" onChange={(e:any) => {handleCodeChange(e.target.value); checkCode()}}/>
                    <span id="codeVerification" className="text-danger"></span>
                </Form.Group>
                <Form.Group className="mb-3" controlId="newTechForm.Description">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control type="text" placeholder="Name" onChange={(e:any) => {handleNameChange(e.target.value); checkCode()}}/>
                    <span id="nameVerification" className="text-danger"></span>
                </Form.Group>
            </Form>
            {/* disable button if codevalid is false */}
            <Button id="btnOk" variant="success" onClick={(e:any) => {submitCourse();}}>Ok</Button>{' '}
            <Link to={`/`}><Button variant="secondary">Cancel</Button>{' '}</Link>
        </div>
    )
    
}

export default AddCourse;