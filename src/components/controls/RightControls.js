import React, {Component} from 'react';
import iconAnnouncementGreen from '../../icons/announcement-green.svg';
import iconAnnouncementYellow from '../../icons/announcement-yellow.svg';
import iconAnnouncementRed from '../../icons/announcement-red.svg';

class RightControls extends Component {
    render() {
        return (
        <div id="rightControls">
          <img onClick={() => this.props.mapComponent.dropLogo("announcementGreen")} alt="Drop positive announcement" width="24px" height="24px" src={iconAnnouncementGreen}/>
          <img onClick={() => this.props.mapComponent.dropLogo("announcementYellow")} alt="Drop neutral announcement" width="24px" height="24px" src={iconAnnouncementYellow}/>
          <img onClick={() => this.props.mapComponent.dropLogo("announcementRed")} alt="Drop negative announcement" width="24px" height="24px" src={iconAnnouncementRed}/>
        </div>
        )
    }
}

export default RightControls;