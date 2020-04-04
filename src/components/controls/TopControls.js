import React, {Component} from 'react';

class TopControls extends Component {
    getChannelOptions() {
        let output = [];
        this.props.mapComponent.channels.forEach((channel, i) => output.push(<option key={i}>{channel.name}</option>))
        return output;
    }

    render() {
        return (
        <div id="topControls">
          <select onChange={this.onChannelSelectorChange} id="channelSelector">
            {this.getChannelOptions()}
          </select>
        </div>
        )
    }
}

export default TopControls;