import React, {Component} from 'react';

class LeftControls extends Component {
    render() {
        return (
        <div id="leftControls">
          Click an icon to drop it on the map.<br/>
          <span className="controlIcon circle">
            <i className="fas fa-circle" onClick={() => this.props.mapComponent.dropLogo("circle")}></i>
          </span><br/>
          I'm ok
          <span className="controlIcon exclamation">
            <i className="fas fa-exclamation" onClick={() => this.props.mapComponent.dropLogo("exclamation")}></i>
          </span><br/>
          I need help
          <span className="controlIcon exclamation-circle">
            <i className="fas fa-exclamation-circle" onClick={() => this.props.mapComponent.dropLogo("exclamation_circle")}></i>
          </span><br/>
          I need help soon
          <span className="controlIcon exclamation-triangle">
            <i className="fas fa-exclamation-triangle" onClick={() => this.props.mapComponent.dropLogo("exclamation_triangle")}></i>
          </span><br/>
          I need help now
        </div>
        )
    }
}

export default LeftControls;