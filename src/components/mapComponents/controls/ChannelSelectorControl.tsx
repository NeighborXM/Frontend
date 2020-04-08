import React, {Component} from 'react';
import './ChannelSelectorControl.css';
import mapComponent from '../../../pages/Map'

type Props = {
    mapComponent: mapComponent;
}
class ChannelSelectorControl extends Component<Props> {
    getChannelOptions() {
        let output = [];
        this.props.mapComponent.channels.forEach((channel, i) => output.push(<option key={i}>{channel.name}</option>))
        return output;
    }

    render() {
        return (
        <div id="channelSelectorControl">
          <select id="channelSelector">
            {this.getChannelOptions()}
          </select>
        </div>
        )
    }
}

export default ChannelSelectorControl;