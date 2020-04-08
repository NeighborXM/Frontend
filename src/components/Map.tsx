///<reference types="@types/googlemaps"/>
import React, {Component} from 'react';
import './Map.css';
import AlertsControl from './controls/AlertsControl';
import AnnouncementsControl from './controls/AnnouncementsControl';
import BottomControl from './controls/BottomControl';
import Channel from '../classes/Channel';
import ChannelSelectorControl from './controls/ChannelSelectorControl';
import ChatScreen from './ChatScreen';
import Icons from '../icons';
import SettingsScreen from './SettingsScreen';
import User from '../classes/User';
import Features from 'classes/Features';
class Map extends Component {
  map: google.maps.Map;
  channels: Channel[] = [new Channel('Saddleback Church'),new Channel('Public Channel')];
  currentChannel: number  = 0;
  lastLocation: google.maps.LatLngLiteral = {lat: 33.749846, lng: -117.834180}
  radius: google.maps.Circle;
  mapScript: any;
  apiKey: string = 'AIzaSyALapSLwcFOvethKmU1BFyera1hAhaJ1Kc'
  
  //#region Google Maps init
  async initMap() {
    let mapTypes: any = require('../objects/mapTypes');
    this.map = new google.maps.Map(document.getElementById('map'), {
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
    
    this.radius = new google.maps.Circle({
      strokeColor: '#000000',
      strokeOpacity: 0.0,
      strokeWeight: 2,
      fillColor: '#000000',
      fillOpacity: 0.35,
      map: this.map,
      center: this.lastLocation,
      radius: 1000,
      draggable: true,
      editable: true
    });

    //#region Push controls to map
    var bottomControl: Element = document.getElementById('bottomControl');
    this.map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(bottomControl);
    
    var channelSelectorControl: Element = document.getElementById('channelSelectorControl');
    this.map.controls[google.maps.ControlPosition.TOP_RIGHT].push(channelSelectorControl);
    
    var alertControls: Element = document.getElementById('alertsControl');
    this.map.controls[google.maps.ControlPosition.LEFT_CENTER].push(alertControls);
    
    var announcementsControl: Element = document.getElementById('announcementsControl');
    this.map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(announcementsControl);
    //#endregion
  }
  
  showMap() {
    window['initMap'] = this.initMap.bind(this);
    this.mapScript = document.createElement('script')
    this.mapScript.src = `https://maps.googleapis.com/maps/api/js?key=${this.apiKey}&callback=initMap`
    document.body.append(this.mapScript);
  }
  //#endregion Google Maps init
  
  
  onMapTypeIdChanged() {
    //Change theme
  }

  pushMarker(features: Features) {
      let user: User = new User();
      user.marker = new google.maps.Marker({
        position: features.position,
        icon: Icons[features.icon],
        map: this.map
      });
      this.channels[this.currentChannel].users.push(user)
  }

  onChannelSelectorChange() {

  }

  dropLogo(type: string) {
    this.pushMarker(
      {
        position: this.radius.getCenter(),
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
        <AlertsControl mapComponent={this}/>
        <AnnouncementsControl mapComponent={this}/>
        <BottomControl mapComponent={this}/>
        <ChannelSelectorControl mapComponent={this}/>
        <ChatScreen mapComponent={this}/>
        <SettingsScreen mapComponent={this}/>
      </div>
    );
  }
}

export default Map;