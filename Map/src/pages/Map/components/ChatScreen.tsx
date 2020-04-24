import React, {Component} from 'react';
import './ChatScreen.css';
import mapComponent from '../../Map'

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
                    <h1 style={{textAlign: "center"}}>Chat</h1>
                    <div id="chatMessages">
                        <table>
                            <tbody>
                                {this.getMessages()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }

    getMessages() {
        let output = []
        let messages = [
            {
                content: "Message Content",
                timeSent: new Date("2020-01-01T00:00:00Z")
            },{
                content: "Message Content",
                timeSent: new Date("2020-01-01T00:00:00Z")
            },{
                content: "Message Content",
                timeSent: new Date("2020-01-01T00:00:00Z")
            }
        ]
        messages.forEach((message, index) => {
        output.push(
            <tr key={index}>
                <td>
                    {`${
                        message.timeSent.getHours()
                    }:${
                        (message.timeSent.getMinutes()>10) ? message.timeSent.getMinutes():"0"+message.timeSent.getMinutes()
                    }`}
                </td>
                <td>
                    {message.content}
                </td>
            </tr>)
        });
        return output;
    }
}

export default ChatScreen;