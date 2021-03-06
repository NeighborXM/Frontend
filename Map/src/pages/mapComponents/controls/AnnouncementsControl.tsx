import React, {Component} from 'react';
import Icons from '../../Map/icons';
import './AnnouncementsControl.css';
import mapComponent from '../../Map'

type Props = {
    mapComponent: mapComponent;
}
class AnnouncementsControl extends Component<Props> {
    render() {
        return (
        <div id="announcementsControl">
          Click an icon to drop it on the map.<br/>
          <img alt="Medical updates" onClick={() => this.props.mapComponent.dropIconOntoMap("handHoldingMedical")} src={Icons.handHoldingMedical}/>
          Medical Updates
          <img alt="Local announcements" onClick={() => this.props.mapComponent.dropIconOntoMap("bullhorn")} src={Icons.bullhorn}/>
          Local Announcements
          <img alt="Local events" onClick={() => this.props.mapComponent.dropIconOntoMap("calendarCheck")} src={Icons.calendarCheck}/>
          Local Events
        </div>
        )
    }
}

export default AnnouncementsControl;