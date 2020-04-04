import React, {Component} from 'react';
import iconAlertGreen from '../../icons/alert-green.svg';
import iconAlertRed from '../../icons/alert-red.svg';
import iconAlertYellow from '../../icons/alert-yellow.svg';

class LeftControls extends Component {
    render() {
        return (
        <div id="leftControls">
          <img onClick={() => this.props.mapComponent.dropLogo("alertGreen")} alt="Drop positive alert" width="24px" height="24px" src={iconAlertGreen}/>
          <img onClick={() => this.props.mapComponent.dropLogo("alertYellow")} alt="Drop neutral alert" width="24px" height="24px" src={iconAlertYellow}/>
          <img onClick={() => this.props.mapComponent.dropLogo("alertRed")} alt="Drop negative alert" width="24px" height="24px" src={iconAlertRed}/>
        </div>
        )
    }
}

export default LeftControls;