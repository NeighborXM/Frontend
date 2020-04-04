import React, {Component} from 'react';

class TopRightControls extends Component {
    getChannelOptions() {
        let output = [];
        this.props.mapComponent.channels.forEach((channel, i) => output.push(<option key={i}>{channel.name}</option>))
        return output;
    }

    render() {
        return (
        <div id="topRightControls">
          <select onChange={this.onChannelSelectorChange} id="channelSelector">
            {this.getChannelOptions()}
          </select>
        </div>
        )
    }
}

export default TopRightControls;