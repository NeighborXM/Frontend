import React, {Component} from 'react';
import './Map.css'
import iconAlertGreen from './icons/alert-green.svg';
import iconAlertRed from './icons/alert-red.svg';
import iconAlertYellow from './icons/alert-yellow.svg';
import iconAnnouncementGreen from './icons/announcement-green.svg';
import iconAnnouncementYellow from './icons/announcement-yellow.svg';
import iconAnnouncementRed from './icons/announcement-red.svg';
import iconMicOff from './icons/mic_off-24px.svg';
import iconMicOn from './icons/mic-24px.svg';
import iconBroadcasting from './icons/voice_over_on-24px.svg';
import iconSilent from './icons/record_voice_over-24px.svg';

class User {
  marker;
}

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

class Map extends Component {
  /**
   * @type window.google.maps.Map
   */
  map;
  markers = [];
  channels = [new Channel('Public Channel')];
  currentChannel = 0;
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
  initMap() {
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
      center: new window.google.maps.LatLng(-33.91722, 151.23064),
      mapTypeId: 'roadmap',
      disableDefaultUI: true,
      zoomControl: true,
      fullscreenControl: true,
      scaleControl: true,
      mapTypeControl: false,
      mapTypeControlOptions: {
        mapTypeIds: ['light',  'dark']
      },
    });
    this.map.mapTypes.set('light', lightMapType);
    this.map.mapTypes.set('dark', darkMapType);
    this.map.setMapTypeId('dark');
    this.map.addListener('maptypeid_changed', this.onMapTypeIdChanged)
    navigator.geolocation.getCurrentPosition(
      function(location) {
        this.pushMarkers([
          {
            position: {lat: location.coords.latitude + 0.005, lng: location.coords.longitude + 0.005},
            icon: 'broadcasting'
          }
        ]);
        this.map.setCenter({lat: location.coords.latitude, lng: location.coords.longitude})
        this.radius = new window.google.maps.Circle({
          strokeColor: '#000000',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#000000',
          fillOpacity: 0.35,
          map: this.map,
          center: {lat: location.coords.latitude, lng: location.coords.longitude},
          radius: 1000
        });
      }.bind(this),
      function(err) {console.error(err)},
      {enableHighAccuracy: true}
      ); 
    //#region Push controls to map
    var bottomControls = document.getElementById('bottomControls');
    this.map.controls[window.google.maps.ControlPosition.BOTTOM_CENTER].push(bottomControls);
    
    var topControls = document.getElementById('topControls');
    this.map.controls[window.google.maps.ControlPosition.TOP_CENTER].push(topControls);
    
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
        console.log('Light')
        root.style.setProperty('--control-bg', 'var(--lightControl-bg)');
        root.style.setProperty('--control-bg-transparent', '--lightControl-bg-transparent');
        root.style.setProperty('--control-text', 'var(--lightControl-text)');
        break;
      case 'dark':
        console.log('Dark')
        root.style.setProperty('--control-bg', 'var(--darkControl-bg)');
        root.style.setProperty('--control-bg-transparent', 'var(--darkControl-bg-transparent)');
        root.style.setProperty('--control-text', 'var(--darkControl-text)');
        break;
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

  getChannelOptions() {
    let output = [];
    this.channels.forEach((channel, i) => output.push(<option key={i}>{channel.name}</option>))
    return output;
  }

  //#region Event handlers
  onChannelSelectorChange(event) {
    this.users.map(user => {
      user.marker.setMap(null);
    })
  }
  onMicButtonClick(event) {
    var img = document.querySelector('#micButton img');
    img.src = img.className==="micOff" ? iconMicOn : iconMicOff;
    img.className = img.className==="micOff" ?  "micOn":"micOff";
  }
  //#endregion
  dropLogo(type) {
    navigator.geolocation.getCurrentPosition(
      function(location) {
        this.pushMarkers([
          {
            position: {lat: location.coords.latitude, lng: location.coords.longitude},
            icon: type
          }
        ]);
      }.bind(this),
      function(err) {console.error(err)},
      {enableHighAccuracy: true}
      );
  }
  render() {
    if(!this.mapScript) this.showMap()
    this.initMap = this.initMap.bind(this);
    this.onMapTypeIdChanged = this.onMapTypeIdChanged.bind(this);
    return (
      <div>
        <div id="topControls">
          <select onChange={this.onChannelSelectorChange} id="channelSelector">
            {this.getChannelOptions()}
          </select>
        </div>
        <div id="bottomControls">
          <div id="micButton" onClick={this.onMicButtonClick}>
            <img className="micOff" alt="Microphone is off" width="48px" height="48px" src={iconMicOff}/></div>
          </div>
        <div id="leftControls">
          <img onClick={() => this.dropLogo("alertGreen")} alt="Drop positive alert" width="24px" height="24px" src={iconAlertGreen}/>
          <img onClick={() => this.dropLogo("alertYellow")} alt="Drop neutral alert" width="24px" height="24px" src={iconAlertYellow}/>
          <img onClick={() => this.dropLogo("alertRed")} alt="Drop negative alert" width="24px" height="24px" src={iconAlertRed}/>
        </div>
        <div id="rightControls">
          <img onClick={() => this.dropLogo("announcementGreen")} alt="Drop positive announcement" width="24px" height="24px" src={iconAnnouncementGreen}/>
          <img onClick={() => this.dropLogo("announcementYellow")} alt="Drop neutral announcement" width="24px" height="24px" src={iconAnnouncementYellow}/>
          <img onClick={() => this.dropLogo("announcementRed")} alt="Drop negative announcement" width="24px" height="24px" src={iconAnnouncementRed}/>
        </div>
      </div>
    );
  }
}

export default Map;
