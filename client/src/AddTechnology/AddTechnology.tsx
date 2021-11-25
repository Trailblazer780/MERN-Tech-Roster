import React from 'react';
import { Form } from 'react-bootstrap';
import './AddTechnology.scss';



const AddTechnology = () => {

    return (
        <div>
            <h1>Add Technology:</h1><br></br>
            <div className="form-input">
                <label className="form-input__label">Name:</label>
                <input className="form-input__input" type="text" placeholder="Name" />
            </div>
            <div className="form-input">
                <label className="form-input__label">Description:</label>
                <textarea className="form-input__inputDescription" placeholder="Description"> </textarea>
            </div>
        </div>
    )
    
}

export default AddTechnology;