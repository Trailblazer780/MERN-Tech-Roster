import React from 'react';
import './Home.scss';
import {ComponentProps, Technology, Course} from './../tools/data.model';
import { useParams } from 'react-router-dom';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'react-bootstrap';

const Home = ({technologies}:ComponentProps) => {

    // ---------------------------------- render to the DOM
    return(
        <div className="content">
            <div className="content__section">
                <div className="content__caption">Click the technology name below to find out what courses require it:</div>
                <div className="content__list">
                <Link to={`/AddTechnology`}><Button variant="success"><FontAwesomeIcon icon={faPlus} /></Button>{' '}</Link>
                </div>
                {technologies.map((data:Technology, n:number) => 
                    <div key={n} className="content__list">
                        <Link to={`/tech/${data._id}`}>{data.name}</Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;