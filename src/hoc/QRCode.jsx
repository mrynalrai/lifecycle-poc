import React, { Component} from 'react';
import Content from '../Container/Content';
import Visibility from 'visibilityjs';
import TimeMe from 'timeme.js';

class QRCode extends Component {
    constructor(props) {
        super(props);
        TimeMe.initialize({
            currentPage: 'home',
            idleTimeoutInSeconds: 30
        });
        this.STORAGE_KEY = 'qr-state:' + window.location.pathname;
        this.state = {
          events: JSON.parse(window.localStorage.getItem(this.STORAGE_KEY))
        }
    }
    componentDidMount() {
      this.addEvents();
      document.addEventListener("click", this.clickAnalyticsListener);
      Visibility.change((e, state) => {
        if (state === 'visible')  //For Chrome support, when user comes back to landing page
          this.handleVisibilityChange();
      });
    }

    addEvents = () => {
        const events = [
            'pageshow',
            'pagehide'
          ];
          const eventLogger = event => {
            switch (event.type) {
              case "beforeunload":
                this.appendStoredState(event.type, new Date().toISOString());
                break;
              case "pageshow":
                TimeMe.startTimer('home');
                this.appendStoredState(event.type, new Date().toISOString(), null);
                break;
              case "pagehide":
                let ts= TimeMe.getTimeOnPageInSeconds('home');
                TimeMe.resetRecordedPageTime('home');
                TimeMe.startTimer('home');
                this.appendStoredState(event.type, new Date().toISOString(), ts);
                break;
            }
          };
          
          events.forEach(eventName =>
            window.addEventListener(eventName, eventLogger)
          );
    }
    componentWillUnmount() {
      document.removeEventListener("click", this.clickAnalyticsListener);
    }
    /**
     * Sends analytics data
     * @param {Event} e 
     */
    clickAnalyticsListener = (e) => {
        const target = e.target.closest(".click-analytics");
        if (target && target.classList.contains("click-analytics")) {
            e.preventDefault();
            this.handleClick(target);
        }
    };
    handleClick(e) {
      window.localStorage.setItem("scrollPosition", window.pageYOffset);
      const info = e.getAttribute("info");
      //const source = CONSTS.CHANNEL_MAPPING[this.props.src];
      const component = e.getAttribute("panel");
    //   let data = {
    //     ctry: this.props.ctry,
    //     prd: this.props.prd,
    //     src: source,
    //     comp: component,
    //     info: info,
    //     event: "click",
    //     ts: new Date()
    //   }
      //window.localStorage.setItem("clickData", JSON.stringify(data));
      let ts = TimeMe.getTimeOnPageInSeconds('home');
    //   postClickAnalytics(this.props.ctry, this.props.prd, source, component, info, "click")
    //     .finally(() => {
    //       TimeMe.resetRecordedPageTime('home');
    //       TimeMe.startTimer('home');
    //       window.location.href = e.href;
    //     });
    }
  
    /**
     * Send logs for navigation analytics
     */
    handleVisibilityChange = () => {
      if (window.localStorage.getItem('clickData') !== null) {
        let clickData = JSON.parse(window.localStorage.getItem('clickData'));
        if (clickData) {
        //   if (this.props.ctry === clickData.ctry && this.props.prd === clickData.prd && CONSTS.CHANNEL_MAPPING[this.props.src] === clickData.src && (new Date() - Date.parse(clickData.ts)) <= 300000) {  //5 minutes threshold value
        //     postClickAnalytics(clickData.ctry, clickData.prd, clickData.src, clickData.info, "Returned", "navigation");
        //   }
          window.localStorage.removeItem('clickData');
        }
      }
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
  
      appendStoredState = (event, date, ts) => {
        var stateHistory = this.getStoredState();
      
        stateHistory.push({ event: event, date: date, ts: ts });
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
            <Content></Content>
            <button onClick={this.clearStoredState}>Clear!</button>
              {
                (this.state.events) ?
                this.state.events.map( el => {
                  return <p>{el.date +' '+el.event +' '+el.ts}</p>
                }):
                <p>No events found</p>
              }
            </div>
        )
    }
}

export default QRCode;