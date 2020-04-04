import React, {Component} from 'react';

class TopControls extends Component {
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

export default TopRightControls;