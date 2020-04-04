import React, {Component} from 'react';

class SettingsScreen extends Component {

    doHide = true;
    hide() {
        if(this.doHide)
        document.getElementById("settingsScreen").style.display = "none";
    }
    changeMapTheme(theme) {
        this.props.mapComponent.map.setMapTypeId(theme);
    }
    render() {
        this.hide = this.hide.bind(this);
        return (
            <div id="settingsScreen" onClick={this.hide}>
                <div id="settingsScreenOverlay" onMouseEnter={() => this.doHide = false} onMouseLeave={() => this.doHide = true}>
                    <div style={{width: "100%", textAlign: "center"}}><h1>Settings</h1></div>
                    <button className="btn btn-light" onClick={() => this.changeMapTheme('light')}>Light Theme</button>
                    <button className="btn btn-dark" onClick={() => this.changeMapTheme('dark')}>Dark Theme</button>
                </div>
            </div>
        )
    }
}

export default SettingsScreen;