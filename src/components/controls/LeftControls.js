import React, {Component} from 'react';
import icons from '../../icons';
import './LeftControls.css'

class LeftControls extends Component {
    render() {
        return (
        <div id="leftControls">
          Click an icon to drop it on the map.<br/>
          <img alt="I'm okay" id="circleIcon" onClick={() => this.props.mapComponent.dropLogo("circle")} src={icons.circle}/>
          I'm ok
          <img alt="I need help" onClick={() => this.props.mapComponent.dropLogo("exclamation")} src={icons.exclamation}/>
          I need help
          <img alt="I need help soon" onClick={() => this.props.mapComponent.dropLogo("exclamationCircle")} src={icons.exclamationCircle}/>
          I need help soon
          <img alt="I need help now" onClick={() => this.props.mapComponent.dropLogo("exclamationTriangle")} src={icons.exclamationTriangle}/>
          I need help now
        </div>
        )
    }
}

export default LeftControls;