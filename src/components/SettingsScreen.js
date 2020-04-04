import React, {Component} from 'react';

class SettingsScreen extends Component {

    doHide = true;
    hide() {
        if(this.doHide)
        document.getElementById("settingsScreen").style.display = "none";
      }
    render() {
        this.hide = this.hide.bind(this);
        return (
            <div id="settingsScreen" onClick={this.hide}>
                <div id="settingsScreenOverlay" onMouseEnter={() => this.doHide = false} onMouseLeave={() => this.doHide = true}>
                    <h1 style={{align: "center"}}>No settings here...</h1>
                </div>
            </div>
        )
    }
}

export default SettingsScreen;