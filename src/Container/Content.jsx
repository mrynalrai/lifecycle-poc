import React, { Component} from 'react';
import './Content.css';

class Content extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div className="content">
               <a href='https://developers.google.com/web/updates/2018/07/page-lifecycle-api'>
                Page lifecycle
                </a> 
                <a href='https://blog.bessereau.eu/assets/pdfs/canvas_framework.pdf'>
                    Salesforce canvas guide
                </a>
            </div>
        )
    }
}

export default Content;