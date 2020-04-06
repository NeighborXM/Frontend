import React, {Component} from 'react';
import Icons from '../../icons';
import './RightControls.css';

class RightControls extends Component {
    render() {
        return (
        <div id="rightControls">
          Click an icon to drop it on the map.<br/>
          <img alt="Medical updates" onClick={() => this.props.mapComponent.dropLogo("handHoldingMedical")} src={Icons.handHoldingMedical}/>
          Medical Updates
          <img alt="Local announcements" onClick={() => this.props.mapComponent.dropLogo("bullhorn")} src={Icons.bullhorn}/>
          Local Announcements
          <img alt="Local events" onClick={() => this.props.mapComponent.dropLogo("calendarCheck")} src={Icons.calendarCheck}/>
          Local Events
        </div>
        )
    }
}

export default RightControls;