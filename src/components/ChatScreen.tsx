import React, {Component} from 'react';
import './ChatScreen.css';
import mapComponent from '../pages/Map'

type Props = {
    mapComponent: mapComponent;
}
class ChatScreen extends Component<Props> {

    doHide: boolean = true;
    hide() {
        if(this.doHide)
        document.getElementById("chatScreen").style.display = "none";
      }
    render() {
        this.hide = this.hide.bind(this);
        return (
            <div id="chatScreen" onClick={this.hide}>
                <div id="chatScreenOverlay" onMouseEnter={() => this.doHide = false} onMouseLeave={() => this.doHide = true}>
                    <h1>Chat</h1>
                    <span>Jacob@15:50: Can somebody come over to my house?  I need help bringing my grocery delivery inside.</span><br/><br/>
                    <span>Amanda@15:52: On my way!</span>
                </div>
            </div>
        )
    }
}

export default ChatScreen;