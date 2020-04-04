import React, {Component} from 'react';
import './Map.css';
//#region Icon imports
import iconAlertGreen from '../icons/alert-green.svg';
import iconAlertRed from '../icons/alert-red.svg';
import iconAlertYellow from '../icons/alert-yellow.svg';
import iconAnnouncementGreen from '../icons/announcement-green.svg';
import iconAnnouncementYellow from '../icons/announcement-yellow.svg';
import iconAnnouncementRed from '../icons/announcement-red.svg';
import iconBroadcasting from '../icons/user_broadcasting.svg';
import iconSilent from '../icons/user_silent.svg';
//#endregion
import TopControls from './controls/TopControls';
import BottomControls from './controls/BottomControls';
import LeftControls from './controls/LeftControls';
import RightControls from './controls/RightControls';
import ChatScreen from './ChatScreen';
import SettingsScreen from './SettingsScreen';


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
  channels = [new Channel('Public Channel'), new Channel('YMCA Members')];
  currentChannel = 0;
  lastLocation = {lat: -33.91722, lng: 151.23064}
  radius;
  icons = {
    broadcasting: {
      name: 'Broadcasting user',
      icon: iconBroadcasting
    },
    silent: {
      name: 'Silent user',
      icon: iconSilent
    },
    alertGreen: {
      name: 'Green Alert',
      icon: iconAlertGreen
    },
    alertYellow: {
      name: 'Yellow alert',
      icon: iconAlertYellow
    },
    alertRed: {
      name: 'Red alert',
      icon: iconAlertRed
    },
    announcementGreen: {
      name: 'Green announcement',
      icon: iconAnnouncementGreen
    },
    announcementYellow: {
      name: 'Yellow announcement',
      icon: iconAnnouncementYellow
    },
    announcementRed: {
      name: 'Red Announcement',
      icon: iconAnnouncementRed
    },
  };
  
  //#region Google Maps init
  async initMap() {
    var lightMapType = new window.google.maps.StyledMapType(
      [
        {elementType: 'geometry', stylers: [{color: '#ebe3cd'}]},
        {elementType: 'labels.text.fill', stylers: [{color: '#523735'}]},
        {elementType: 'labels.text.stroke', stylers: [{color: '#f5f1e6'}]},
        {
          featureType: 'administrative',
          elementType: 'geometry.stroke',
          stylers: [{color: '#c9b2a6'}]
        },
        {
          featureType: 'administrative.land_parcel',
          elementType: 'geometry.stroke',
          stylers: [{color: '#dcd2be'}]
        },
        {
          featureType: 'administrative.land_parcel',
          elementType: 'labels.text.fill',
          stylers: [{color: '#ae9e90'}]
        },
        {
          featureType: 'landscape.natural',
          elementType: 'geometry',
          stylers: [{color: '#dfd2ae'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{color: '#f5f1e6'}]
        },
        {
          featureType: 'road.arterial',
          elementType: 'geometry',
          stylers: [{color: '#fdfcf8'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [{color: '#f8c967'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [{color: '#e9bc62'}]
        },
        {
          featureType: 'road.highway.controlled_access',
          elementType: 'geometry',
          stylers: [{color: '#e98d58'}]
        },
        {
          featureType: 'road.highway.controlled_access',
          elementType: 'geometry.stroke',
          stylers: [{color: '#db8555'}]
        },
        {
          featureType: 'road.local',
          elementType: 'labels.text.fill',
          stylers: [{color: '#806b63'}]
        },
        {
          featureType: 'transit.line',
          elementType: 'geometry',
          stylers: [{color: '#dfd2ae'}]
        },
        {
          featureType: 'transit.line',
          elementType: 'labels.text.fill',
          stylers: [{color: '#8f7d77'}]
        },
        {
          featureType: 'transit.line',
          elementType: 'labels.text.stroke',
          stylers: [{color: '#ebe3cd'}]
        },
        {
          featureType: 'transit.station',
          elementType: 'geometry',
          stylers: [{color: '#dfd2ae'}]
        },
        {
          featureType: 'water',
          elementType: 'geometry.fill',
          stylers: [{color: '#b9d3c2'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [{color: '#92998d'}]
        },
        {
          featureType: "poi",
          stylers: [
            {
              visibility: "off"
            }
          ]
        }
      ], {name: 'Light'});
    var darkMapType = new window.google.maps.StyledMapType(
      [
        {
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#242f3e"
            }
          ]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#746855"
            }
          ]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#242f3e"
            }
          ]
        },
        {
          "featureType": "administrative.locality",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#d59563"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#38414e"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#212a37"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9ca5b3"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#746855"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#1f2835"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#f3d19c"
            }
          ]
        },
        {
          "featureType": "transit",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#2f3948"
            }
          ]
        },
        {
          "featureType": "transit.station",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#d59563"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#17263c"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#515c6d"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#17263c"
            }
          ]
        },
        {
          "featureType": "poi",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        }
      ], {name: 'Dark'});

    this.map = new window.google.maps.Map(document.getElementById('map'), {
      zoom: 16,
      center: this.lastLocation,
      mapTypeId: 'dark',
      disableDefaultUI: true,
      zoomControl: true,
      fullscreenControl: false,
      scaleControl: true,
      mapTypeControl: true,
      mapTypeControlOptions: {
        mapTypeIds: ['light',  'dark']
      },
    });
    this.map.mapTypes.set('light', lightMapType);
    this.map.mapTypes.set('dark', darkMapType);
    this.map.addListener('maptypeid_changed', this.onMapTypeIdChanged)
    
    this.radius = new window.google.maps.Circle({
      strokeColor: '#000000',
      strokeOpacity: 0.8,
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
    
    var topControls = document.getElementById('topControls');
    this.map.controls[window.google.maps.ControlPosition.TOP_RIGHT].push(topControls);
    
    var leftControls = document.getElementById('leftControls');
    this.map.controls[window.google.maps.ControlPosition.LEFT_CENTER].push(leftControls);
    
    var rightControls = document.getElementById('rightControls');
    this.map.controls[window.google.maps.ControlPosition.RIGHT_CENTER].push(rightControls);
    //#endregion
  }
  
  showMap() {
    window.initMap = this.initMap.bind(this);
    this.mapScript = document.createElement('script')
    this.mapScript.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBE6XOeqFdxBYne49mBI-_4lypZQam_HO4&callback=initMap'
    document.body.append(this.mapScript);
  }
  //#endregion Google Maps init
  
  
  onMapTypeIdChanged() {
    let root = document.documentElement;
    switch(this.map.getMapTypeId()) {
      case 'light':
        root.style.setProperty('--control-bg', 'var(--lightControl-bg)');
        root.style.setProperty('--control-text', 'var(--lightControl-text)');
        root.style.setProperty('--control-outline', 'var(--lightControl-outline)');
        break;
      case 'dark':
        root.style.setProperty('--control-bg', 'var(--darkControl-bg)');
        root.style.setProperty('--control-text', 'var(--darkControl-text)');
        root.style.setProperty('--control-outline', 'var(--darkControl-outline)');
        break;
      default: break;
    }
  }

  pushMarkers(features) {
    for(let i = 0; i < features.length; i++) {
      let user = new User();
      user.marker = new window.google.maps.Marker({
        position: features[i].position,
        icon: this.icons[features[i].icon].icon,
        map: this.map,
        size: new window.google.maps.Size(24,24)
      });
      this.channels[this.currentChannel].users.push(user)
    }
  }

  onChannelSelectorChange(event) {
    this.users.map(user => {
      user.marker.setMap(null);
      return null;
    })
  }

  dropLogo(type) {
        this.pushMarkers([
          {
            position: this.radius.getCenter(),
            icon: type
          }
        ]);
  }
  render() {
    this.initMap = this.initMap.bind(this);
    if(!this.mapScript) this.showMap()
    this.onMapTypeIdChanged = this.onMapTypeIdChanged.bind(this);
    return (
      <div>
        <TopControls mapComponent={this}/>
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
