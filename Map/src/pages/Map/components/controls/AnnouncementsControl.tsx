import React, {Component} from 'react';
import Icons from '../../icons';
import './AnnouncementsControl.css';
import mapComponent from '../../../Map';

type Props = {
    mapComponent: mapComponent;
}
class AnnouncementsControl extends Component<Props> {
    render() {
        return (
        <div id="announcementsControl">
          Click an icon to drop it on the map.<br/>
          <img alt="Medical updates" onClick={() => this.props.mapComponent.dropIconOntoMap("medicalUpdate")} src={Icons.handHoldingMedical}/>
          Medical Updates
          <img alt="Local announcements" onClick={() => this.props.mapComponent.dropIconOntoMap("localAnnouncement")} src={Icons.bullhorn}/>
          Local Announcements
          <img alt="Local events" onClick={() => this.props.mapComponent.dropIconOntoMap("localEvent")} src={Icons.calendarCheck}/>
          Local Events
          <img alt="I need help soon" onClick={() => this.props.mapComponent.dropIconOntoMap("askForHelp")} src={Icons.exclamationCircle}/>
          Ask for Help
        </div>
        )
    }
}

export default AnnouncementsControl;