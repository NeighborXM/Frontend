import React, {Component} from 'react';
import iconMicOff from '../../icons/mic_off.svg';
import iconMicOn from '../../icons/mic_on.svg';
import iconSettings from '../../icons/settings.svg';
import iconChat from '../../icons/chat.svg'

class BottomControls extends Component {
    onMicButtonClick(event) {
        var img = document.querySelector('#micButton img');
        img.src = img.className==="micOff" ? iconMicOn : iconMicOff;
        img.className = img.className==="micOff" ?  "micOn":"micOff";
    }
    onSettingsButtonClick(event) {
      document.getElementById("settingsScreen").style.display = "flex";
    }
    onChatButtonClick(event) {
      document.getElementById("chatScreen").style.display = "flex";
    }
    render() {
        this.onMicButtonClick = this.onMicButtonClick.bind(this);
        this.onSettingsButtonClick = this.onSettingsButtonClick.bind(this);
        this.onChatButtonClick = this.onChatButtonClick.bind(this);
        return(
        <div id="bottomControls">
          <div id="chatButton" onClick={this.onChatButtonClick}>
            <img alt="Enter chat" width="48px" height="48px" src={iconChat}/>
          </div>
          <div id="micButton" onClick={this.onMicButtonClick}>
            <img className="micOff" alt="Microphone is off" width="48px" height="48px" src={iconMicOff}/>
          </div>
          <div id="settingsButton" onClick={this.onSettingsButtonClick}>
            <img alt="Settings" width="48px" height="48px" src={iconSettings}/>
          </div>
        </div>
        )
    }
}

export default BottomControls;