import React, {Component} from 'react';
import './Map.css';
import TopRightControls from './controls/TopRightControls';
import BottomControls from './controls/BottomControls';
import LeftControls from './controls/LeftControls';
import RightControls from './controls/RightControls';
import ChatScreen from './ChatScreen';
import SettingsScreen from './SettingsScreen';
import Icons from '../icons';



class Channel {
  /**
   * @type String
   */
  name;
  /**
   * @type User
   */
  users = [];
  constructor(name) {
    this.name = name;
  }
}

class User {
  marker;
}
class Map extends Component {
  /**
   * @type window.google.maps.Map
   */
  map;
  channels = [new Channel('Saddleback Church'),new Channel('Public Channel')];
  currentChannel = 0;
  lastLocation = {lat: 33.749846, lng: -117.834180}
  radius;
  apiKey = 'AIzaSyALapSLwcFOvethKmU1BFyera1hAhaJ1Kc'
  
  //#region Google Maps init
  async initMap() {
    let mapTypes = require('../objects/mapStyles');
    this.map = new window.google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: this.lastLocation,
      mapTypeId: 'light',
      disableDefaultUI: true,
      zoomControl: true,
      fullscreenControl: false,
      scaleControl: true,
      mapTypeControlOptions: {
        mapTypeIds: ['light',  'dark']
      },
    });
    this.map.mapTypes.set('light',  mapTypes.warmMapType);
    this.map.mapTypes.set('dark', mapTypes.darkMapType);
    this.map.addListener('maptypeid_changed', this.onMapTypeIdChanged)
    
    this.radius = new window.google.maps.Circle({
      strokeColor: '#000000',
      strokeOpacity: 0.0,
      strokeWeight: 2,
      fillColor: '#000000',
      fillOpacity: 0.35,
      map: this.map,
      center: this.lastLocation,
      radius: 1000,
      dragable: true,
      editable: true
    });

    //#region Push controls to map
    var bottomControls = document.getElementById('bottomControls');
    this.map.controls[window.google.maps.ControlPosition.BOTTOM_CENTER].push(bottomControls);
    
    var topRightControls = document.getElementById('topRightControls');
    this.map.controls[window.google.maps.ControlPosition.TOP_RIGHT].push(topRightControls);
    
    var leftControls = document.getElementById('leftControls');
    this.map.controls[window.google.maps.ControlPosition.LEFT_CENTER].push(leftControls);
    
    var rightControls = document.getElementById('rightControls');
    this.map.controls[window.google.maps.ControlPosition.RIGHT_CENTER].push(rightControls);
    //#endregion
  }
  
  showMap() {
    window.initMap = this.initMap.bind(this);
    this.mapScript = document.createElement('script')
    this.mapScript.src = `https://maps.googleapis.com/maps/api/js?key=${this.apiKey}&callback=initMap`
    document.body.append(this.mapScript);
  }
  //#endregion Google Maps init
  
  
  onMapTypeIdChanged() {
    //Change theme
  }

  pushMarker(features) {
      let user = new User();
      user.marker = new window.google.maps.Marker({
        position: features.position,
        icon: Icons[features.icon],
        map: this.map,
        size: new window.google.maps.Size(24,24)
      });
      this.channels[this.currentChannel].users.push(user)
  }

  onChannelSelectorChange(event) {
    this.users.map(user => {
      user.marker.setMap(null);
      return null;
    })
  }

  dropLogo(type, position) {
    this.pushMarker(
      {
        position: position | this.radius.getCenter(),
        icon: type
      }
    );
  }
  render() {
    this.initMap = this.initMap.bind(this);
    this.showMap = this.showMap.bind(this);
    this.onMapTypeIdChanged = this.onMapTypeIdChanged.bind(this);
    if(!this.mapScript) this.showMap()
    return (
      <div>
        <TopRightControls mapComponent={this}/>
        <BottomControls mapComponent={this}/>
        <LeftControls mapComponent={this}/>
        <RightControls mapComponent={this}/>
        <ChatScreen mapComponent={this}/>
        <SettingsScreen mapComponent={this}/>
      </div>
    );
  }
}

export default Map;
