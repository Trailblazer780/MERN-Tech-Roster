import React from 'react';
import { Button, Form } from 'react-bootstrap';
import './EditTechnology.scss';
import {Technology, Course, EditProps} from './../tools/data.model';
import { useParams } from 'react-router-dom';
import {Link} from 'react-router-dom';


const EditTechnology = ({technologies, courses}:EditProps) => {

    let { id } = useParams<{ id: string }>();
    // Check the id 
    console.log("recived id: " + id);

    const submitTechnology = (e: any) => {
        console.log(name);
        // console.log(description);
        // console.log(difficulty);
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
    let technology:(Technology|undefined) = technologies.find(item => item._id === id);


    // -------------------------------------------------- State Variables -------------------------------------------------
    // const [name, setName] = React.useState<string>(technology.name);
    // const [description, setDescription] = React.useState<string>(technology.description);
    // const [difficulty, setDifficulty] = React.useState<number>(technology.difficulty);
    const [values, setValues] = React.useState<string[]>([]);


    if (technology === undefined) {
        return <div>
            <h1>Technology not found</h1>
            <Link to="/">Back to home</Link>
        </div>
    }

    let name = technology.name;
    let description = technology.description;
    let difficulty = technology.difficulty;

    let intech: string[] = []; 
    technology.courses.forEach((course:Course) => {intech.push(course.code);});
    console.log(intech);

    // -------------------------------------------------- Event Handlers --------------------------------------------------
    const handleSelectChange = (e: any) => {
        difficulty = e;
        console.log(difficulty);
    }

    const handleDescChange = (e: any) => {
        description = e;
        console.log(description);
    }   
    
    const handleNameChange = (e: any) => {
        name = e;
        console.log(name);
    }


    return (
        (technology === undefined) ?
            <div>
                <h1>Technology not found</h1>
                <Link to="/">Back to home</Link>
            </div>
        :
            <div>
                <h1>Edit Technology:</h1><br></br>
                <Form>
                    <Form.Group className="mb-3" controlId="newTechForm.Name">
                        <Form.Label>Technology Name:</Form.Label>
                        <Form.Control type="text" placeholder="Name" defaultValue={technology.name} onChange={(e:any) => handleNameChange(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="newTechForm.Description">
                        <Form.Label>Technology Description</Form.Label>
                        <Form.Control as="textarea" placeholder="Description" rows={3} defaultValue={technology.description} onChange={(e:any) => handleDescChange(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="newTechform.DifficultySelect">
                        <Form.Label>Select Difficulty</Form.Label>
                        <Form.Select defaultValue={technology.difficulty} onChange={(e:any) => handleSelectChange(e.target.value)}>
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
                            // turnary operator to check if the course is in the technology
                            // if course is in intech array, check the checkbox
                            <Form.Check key={n} type="checkbox" id={data._id} label={data.code + " " + data.name} defaultChecked={intech.includes(data.code)}/>
                            // <Form.Check key={n} type="checkbox" label={data.code + " " + data.name} id={data._id}/>
                        )}
                    </Form.Group>  
                </Form>
                <Button variant="success" onClick={(e:any) => {submitTechnology(e); getCheckedValues(e)}}>Ok</Button>{' '}
                <Link to={`/`}><Button variant="secondary">Cancel</Button>{' '}</Link>
            </div>
    )
    
}

export default EditTechnology;