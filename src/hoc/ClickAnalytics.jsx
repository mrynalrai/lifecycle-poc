import React, { Component} from 'react';
import lifecycle from 'page-lifecycle';

class ClickAnalytics extends Component {
    constructor(props) {
        super(props);
        console.log('constructor');
    }
    componentDidMount() {
        //console.log(lifecycle);
        // Observe all future state changes.
        lifecycle.addEventListener('statechange', function(evt) {
            console.log(evt.originalEvent.type);
        });
    }

    render() {
        return(
            <div>
                Hello
                {this.props.children}
            </div>
        )
    }
}

export default ClickAnalytics;