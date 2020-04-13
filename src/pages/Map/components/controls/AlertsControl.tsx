import React, {Component} from 'react';
import icons from '../../icons';
import './AlertsControl.css'
import mapComponent from '../../../Map'

type Props = {
    mapComponent: mapComponent;
}
class AlertsControl extends Component<Props> {
    render() {
        return (
        <div id="alertsControl">
          Click an icon to drop it on the map.<br/>
          <img alt="I'm okay" id="circleIcon" onClick={() => this.props.mapComponent.dropIconOntoMap("circle")} src={icons.circle}/>
          I'm ok
          <img alt="I need help" onClick={() => this.props.mapComponent.dropIconOntoMap("exclamation")} src={icons.exclamation}/>
          I need help
          <img alt="I need help soon" onClick={() => this.props.mapComponent.dropIconOntoMap("exclamationCircle")} src={icons.exclamationCircle}/>
          I need help soon
          <img alt="I need help now" onClick={() => this.props.mapComponent.dropIconOntoMap("exclamationTriangle")} src={icons.exclamationTriangle}/>
          I need help now
        </div>
        )
    }
}

export default AlertsControl;