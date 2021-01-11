import React, { Component} from 'react';
import Content from '../Container/Content';
import { isChrome } from 'react-device-detect';
class ClickAnalytics extends Component {
    constructor(props) {
        super(props);
        this.STORAGE_KEY = 'lifecycle-state:' + window.location.pathname;
        this.state = {
          events: JSON.parse(window.localStorage.getItem(this.STORAGE_KEY)),
          isChrome: 'This is not chrome'
        }
    }
    componentDidMount() {
      if (isChrome) {
        this.setState({
          isChrome: 'This is chrome'
        })
      }
        const events = [
          'focus',
          'blur',
          'visibilitychange',
          'freeze',
          'resume',
          'beforeunload',
          'pageshow',
          'pagehide'
        ];
          
          const eventLogger = event => {
            switch (event.type) {
              case "focus":
                this.appendStoredState(event.type, new Date().toISOString());
                break;
              case "blur":
                this.appendStoredState(event.type, new Date().toISOString());
                break;
              case "visibilityChange":
                this.appendStoredState(document.visibilityState, new Date().toISOString());
                break;
              case "freeze":
                this.appendStoredState(event.type, new Date().toISOString());
                break;
              case "resume":
                this.appendStoredState(event.type, new Date().toISOString());
                break;
              case "beforeunload":
                this.appendStoredState(event.type, new Date().toISOString());
                break;
              case "pageshow":
                this.appendStoredState(event.type, new Date().toISOString());
                break;
              case "pagehide":
                this.appendStoredState(event.type, new Date().toISOString());
                break;
              default:
                this.appendStoredState(event.type, new Date().toISOString());
                break;
            }
          };
          
          events.forEach(eventName =>
            window.addEventListener(eventName, eventLogger)
          );
    }
    getStoredState = () => {
      var storedState;
      try {
        storedState = JSON.parse(window.localStorage.getItem(this.STORAGE_KEY));
      } catch (err) {
        // Do nothing.
      }
      return storedState || [];
    };

    appendStoredState = (event, date) => {
      var stateHistory = this.getStoredState();
    
      stateHistory.push({ event: event, date: date });
      window.localStorage.setItem(this.STORAGE_KEY, JSON.stringify(stateHistory));
      this.setState({
        events: stateHistory
      })
    };

    clearStoredState = () => {
      localStorage.removeItem(this.STORAGE_KEY);
      this.setState({
        events: JSON.parse(window.localStorage.getItem(this.STORAGE_KEY))
      })
    };
    render() {
        return(
            <div>
              <p>{this.state.isChrome}</p>
            <Content></Content>
            <button onClick={this.clearStoredState}>Clear!</button>
              {
                (this.state.events) ?
                this.state.events.map( el => {
                  return <p>{el.date +' '+el.event}</p>
                }):
                <p>No events found</p>
              }
            </div>
        )
    }
}

export default ClickAnalytics;