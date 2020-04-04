import React, {Component} from 'react';

class RightControls extends Component {
    render() {
        return (
        <div id="rightControls">
          Click an icon to drop it on the map.<br/>
          <span className="controlIcon">
            <i className="fas fa-hand-holding-medical" onClick={() => this.props.mapComponent.dropLogo("hand_holding_medical")}></i>
          </span><br/>
          Medical Updates
          <span className="controlIcon">
            <i className="fas fa-bullhorn" onClick={() => this.props.mapComponent.dropLogo("bullhorn")}></i>
          </span><br/>
          Local Announcements
          <span className="controlIcon">
            <i className="fas fa-calendar-check" onClick={() => this.props.mapComponent.dropLogo("calendar_check")}></i>
          </span><br/>
          Local Events
        </div>
        )
    }
}

export default RightControls;