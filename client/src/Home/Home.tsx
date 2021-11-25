import React from 'react';
import './Home.scss';
import {ComponentProps, Technology, Course} from './../tools/data.model';
import { useParams } from 'react-router-dom';
import {Link} from 'react-router-dom';

const Home = ({technologies}:ComponentProps) => {

    // isolate the id route parameter
    // let { id } = useParams<{ id: string }>();
    // console.log("recived id: " + id);
    //
    // let technology:(Technology|undefined) = technologies.find(item => item._id === id);

    // ---------------------------------- render to the DOM
    return(
        <div className="content">
            <div className="content__section">
                <div className="content__caption">Click the technology name below to find out what courses require it:</div>

                {/* <div> below to be rendered For each technology */}
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