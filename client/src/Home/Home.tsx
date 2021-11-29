import React from 'react';
import './Home.scss';
import {ComponentProps, Technology, Course} from './../tools/data.model';
import { useParams } from 'react-router-dom';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'react-bootstrap';

const Home = ({technologies}:ComponentProps) => {

    // ---------------------------------- render to the DOM
    return(
        <div className="content">
            <div className="content__section">
                <h3 className="content__caption">Technologies:</h3>
                <div className="content__list">
                <Link to={`/AddTechnology`}><Button variant="success"><FontAwesomeIcon icon={faPlus} /></Button>{' '}</Link>
                </div>
                {technologies.map((data:Technology, n:number) => 
                    <div key={n} className="content__list">
                        <Link to={`edittechnology/`+data._id}><Button variant="secondary"><FontAwesomeIcon icon={faPencilAlt}/></Button>{''}</Link> <Link to={`/deletetechnology/`+data._id}><Button variant="danger"><FontAwesomeIcon icon={faTrash}/></Button></Link> {data.name}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;