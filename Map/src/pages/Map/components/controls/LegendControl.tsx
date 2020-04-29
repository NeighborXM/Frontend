import React, {Component} from 'react';
import Icons from '../../icons';
import './LegendControl.css';
import mapComponent from '../../../Map';

type Props = {
    mapComponent: mapComponent;
}
class LegendControl extends Component<Props> {
    render() {
        return (
        <div id="legendControl">
          <div className="legend">
            <img alt="I need help soon" onClick={() => this.props.mapComponent.dropIconOntoMap("askForHelp")} src={Icons.exclamationCircle}/>
            <img alt="Post medical update" onClick={() => this.props.mapComponent.dropIconOntoMap("medicalUpdate")} src={Icons.handHoldingMedical}/>
          {/* </div>
          <div className="legend"> */}
            <img alt="Post announcement" onClick={() => this.props.mapComponent.dropIconOntoMap("localAnnouncement")} src={Icons.bullhorn}/>
            <img alt="Post event" onClick={() => this.props.mapComponent.dropIconOntoMap("localEvent")} src={Icons.calendarCheck}/>
          </div>
        </div>
        )
    }
}

export default LegendControl;