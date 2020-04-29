import React, {Component} from 'react';
import './SettingsScreen.css';
import mapComponent from '../../Map'
import Icons from '../icons';
import icons from '../icons';

type Props = {
    mapComponent: mapComponent;
}
class SettingsScreen extends Component<Props> {

    doHide: boolean = true;
    hide() {
        if(this.doHide)
        document.getElementById("settingsScreen").style.display = "none";
    }
    changeTheme(theme: string) {
        this.props.mapComponent.changeTheme(theme);
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
    render() {
        this.hide = this.hide.bind(this);
        return (
            <div id="settingsScreen" onClick={this.hide}>
                <div id="settingsScreenOverlay" onMouseEnter={() => this.doHide = false} onMouseLeave={() => this.doHide = true}>
                    <h1 style={{textAlign: "center"}}>Settings</h1>
                    <p style={{textAlign: "center"}}>
                        <button onClick={() => this.changeTheme('light')}>Light Theme</button>
                        <button onClick={() => this.changeTheme('dark')}>Dark Theme</button>
                    </p>
                    <hr/>
                    <h1 style={{textAlign: "center"}}>Help</h1>
                    <p style={{textAlign: "center"}}>You can click an icon from the bottom of the screen to post an alert to the map.  To fill out that alert,
                    click that icon on the map.  You can drag icons to other locations.</p>
                    <hr/>
                    <h2 style={{textAlign: "center"}}>Legend</h2>
                    <div style={{width: "50%", display: "inline-block"}}>
                        <img alt="Request for Help" style={{marginRight: "10px"}} src={icons.exclamationCircle}/>Ask for help<br/>
                        <img alt="Local Announcement" style={{marginRight: "10px"}} src={icons.bullhorn}/>Post an announcement<br/>
                    </div>
                    <div style={{width: "50%", display: "inline-block"}}>
                        <img alt="Medical Update" style={{marginRight: "10px"}} src={icons.handHoldingMedical}/>Post a medical update<br/>
                        <img alt="Local Event" style={{marginRight: "10px"}} src={icons.calendarCheck}/>Post an event<br/>
                    </div>
                    <hr/>
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
}

export default SettingsScreen;