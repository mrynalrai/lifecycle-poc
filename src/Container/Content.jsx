import React, { Component} from 'react';
import './Content.css';

class Content extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div className="content">
               <a href='https://mrinalrai.in/'>
                My Porfolio
                </a> 
                <a href='https://mrinalrai.in/Resume.pdf'>
                    My Resume
                </a>
            </div>
        )
    }
}

export default Content;