import React, {Component} from 'react';
import './SettingsScreen.css';
import mapComponent from '../../pages/Map'

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
    changeListeningAreaRadius() {
        let value = parseInt((document.getElementById('listeningAreaRadius') as HTMLInputElement).value);
        this.props.mapComponent.setListeningRadius(value);
    }
    render() {
        this.hide = this.hide.bind(this);
        this.changeListeningAreaRadius = this.changeListeningAreaRadius.bind(this);
        return (
            <div id="settingsScreen" onClick={this.hide}>
                <div id="settingsScreenOverlay" onMouseEnter={() => this.doHide = false} onMouseLeave={() => this.doHide = true}>
                    <div style={{width: "100%", textAlign: "center"}}><h1>Settings</h1></div>
                    <button className="btn btn-light" onClick={() => this.changeTheme('light')}>Light Theme</button>
                    <button className="btn btn-dark" onClick={() => this.changeTheme('dark')}>Dark Theme</button>
                    <br/>Listening area: <input onChange={this.changeListeningAreaRadius} id="listeningAreaRadius" type="number"/> meters.
                </div>
            </div>
        )
    }
}

export default SettingsScreen;