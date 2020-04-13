///<reference types="@types/googlemaps"/>
import React, {Component} from 'react';
import './Map/Map.css';
import AlertsControl from './Map/components/controls/AlertsControl';
import AnnouncementsControl from './Map/components/controls/AnnouncementsControl';
import BottomControl from './Map/components/controls/BottomControl';
import Channel from './Map/classes/Channel';
import ChannelSelectorControl from './Map/components/controls/ChannelSelectorControl';
import ChatScreen from './Map/components/ChatScreen';
import Icons from './Map/icons';
import SettingsScreen from './Map/components/SettingsScreen';
import User from './Map/classes/User';
import Features from 'pages/Map/classes/Features';
class Map extends Component {
  apiKey: string = 'AIzaSyALapSLwcFOvethKmU1BFyera1hAhaJ1Kc'
  channels: Channel[] = [new Channel('Saddleback Church'), new Channel('Public Channel')];
  currentChannel: number = 0;
  currentUser: User;
  lastLocation: google.maps.LatLngLiteral = {lat: 33.749846, lng: -117.834180}
  map: google.maps.Map;
  mapScript: any;
  radius: google.maps.Circle;
  
  //#region Google Maps init
  async initMap() {
    //Import mapTypes
    let mapTypes: any = require('./Map/objects/mapTypes');
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

    //Set map center based on user location
    navigator.geolocation.getCurrentPosition((position) => {
      this.map.setCenter({lat: position.coords.latitude, lng: position.coords.longitude})
    }, (err) => console.error(err));

    //Watch user location and update circle placement if location changes.
    navigator.geolocation.watchPosition((position) => {
      this.onLocationChange(position.coords)
    }, (err) => {console.error(err)});

    this.map.mapTypes.set('light',  mapTypes.warmMapType);
    this.map.mapTypes.set('dark', mapTypes.darkMapType);
    
    this.radius = new google.maps.Circle({
      strokeColor: '#000000',
      strokeOpacity: 0.5,
      strokeWeight: 1,
      fillColor: '#000000',
      fillOpacity: 0.35,
      map: this.map,
      center: this.lastLocation,
      radius: 1000,
    });

    (document.getElementById("listeningAreaRadius") as HTMLInputElement).value = 
      this.radius.getRadius().toString();

    //#region Push controls to edges of map
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
  
  setListeningRadius(radius: number) {
    this.radius.setRadius(radius);
  }
  
  changeTheme(theme: string) {
    this.map.setMapTypeId(theme);
    let root = document.documentElement;
    switch(theme) {
      default:
      case "light":
        root.style.setProperty('--background','var(--lighttheme-background)');
        root.style.setProperty('--text','var(--lighttheme-text)');
        this.radius.setOptions({fillColor: "#000"});
      break;
      case "dark":
        root.style.setProperty('--background','var(--darktheme-background)');
        root.style.setProperty('--text','var(--darktheme-text)');
        this.radius.setOptions({fillColor: "#fff"});
      break;
    }
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
    //Hide visible markers
    //Show new markers
  }

  onLocationChange(location: Coordinates) {
    let coords: google.maps.LatLngLiteral = {lat: location.latitude, lng: location.longitude};
    this.radius.setCenter(coords);
    this.lastLocation = coords;
  }

  dropIconOntoMap(type: string) {
    this.pushMarker(
      {
        position: this.radius.getCenter(),
        icon: type
      }
    );
  }

  render() {
    return (
      <div>
        <header>
          <img alt="logo" src={`${process.env.PUBLIC_URL}/saddleback-church.png`}/>
          <strong>SADDLEBACK CHURCH</strong>
        </header>
        <div id="map"></div>
        <AlertsControl mapComponent={this}/>
        <AnnouncementsControl mapComponent={this}/>
        <BottomControl mapComponent={this}/>
        <ChannelSelectorControl mapComponent={this}/>
        <ChatScreen mapComponent={this}/>
        <SettingsScreen mapComponent={this}/>
      </div>
    );
  }
  componentDidMount() {
    if(!this.mapScript) {
      this.initMap = this.initMap.bind(this);
      this.showMap = this.showMap.bind(this);
      this.changeTheme = this.changeTheme.bind(this);
      this.showMap()
      
    }
  }
}

export default Map;