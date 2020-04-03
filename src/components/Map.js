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
  name;
  constructor(name) {
    this.name = name;
  }
}

class Map extends Component {
  map;
  markers = [];
  users = [];
  channels = [new Channel('Public Channel'), new Channel('YMCA Members')];

  //#region Google Maps init
  initMap() {
    this.map = new window.google.maps.Map(document.getElementById('map'), {
      zoom: 16,
      center: new window.google.maps.LatLng(-33.91722, 151.23064),
      mapTypeId: 'roadmap',
      styles: [
        {
        featureType: 'poi',
        stylers: [{visibility: 'off'}]
        },
        {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
        {
          featureType: 'administrative.locality',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [{color: '#263c3f'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [{color: '#6b9a76'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{color: '#38414e'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry.stroke',
          stylers: [{color: '#212a37'}]
        },
        {
          featureType: 'road',
          elementType: 'labels.text.fill',
          stylers: [{color: '#9ca5b3'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [{color: '#746855'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [{color: '#1f2835'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'labels.text.fill',
          stylers: [{color: '#f3d19c'}]
        },
        {
          featureType: 'transit',
          elementType: 'geometry',
          stylers: [{color: '#2f3948'}]
        },
        {
          featureType: 'transit.station',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{color: '#17263c'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [{color: '#515c6d'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.stroke',
          stylers: [{color: '#17263c'}]
        }
      ],
      disableDefaultUI: true,
      zoomControl: true,
      fullscreenControl: true,
      scaleControl: true
    });
    
    this.pushMarkers([
      {
        position: {lat: -33.91721, lng: 151.22630},
        icon: 'broadcasting'
      },
      {
        position: {lat: -33.91721, lng: 151.22775},
        icon: 'silent'
      }
    ]);

    var bottomControls = document.getElementById('bottomControls');
    this.map.controls[window.google.maps.ControlPosition.BOTTOM_CENTER].push(bottomControls);
    
    var topControls = document.getElementById('topControls');
    this.map.controls[window.google.maps.ControlPosition.TOP_CENTER].push(topControls);
    
    var leftControls = document.getElementById('leftControls');
    this.map.controls[window.google.maps.ControlPosition.LEFT_CENTER].push(leftControls);
    
    var rightControls = document.getElementById('rightControls');
    this.map.controls[window.google.maps.ControlPosition.RIGHT_CENTER].push(rightControls);
  }
  
  
  showMap() {
    window.initMap = this.initMap.bind(this);
    this.mapScript = document.createElement('script')
    this.mapScript.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBE6XOeqFdxBYne49mBI-_4lypZQam_HO4&callback=initMap'
    document.body.append(this.mapScript);
  }
  //#endregion Google Maps init
  
  pushMarkers(features) {
    var icons = {
      broadcasting: {
        name: 'Broadcasting',
        icon: iconBroadcasting
      },
      silent: {
        name: 'Silent',
        icon: iconSilent
      }
    };
    
    for(let i = 0; i < features.length; i++) {
      let user = new User();
      user.marker = new window.google.maps.Marker({
        position: features[i].position,
        icon: icons[features[i].icon].icon,
        map: this.map
      });
      this.users.push(user)
    }
  }

  getChannelOptions() {
    let output = [];
    this.channels.forEach((channel, i) => output.push(<option key={i}>{channel.name}</option>))
    return output;
  }

  //#region Event handlers
  onChannelSelectorChange(event) {
    
  }
  onMicButtonClick(event) {
    var img = document.querySelector('#micButton img');
    img.src = img.className==="micOff" ? iconMicOn : iconMicOff
    img.className = img.className==="micOff" ?  "micOn":"micOff" 
  }
  //#endregion

  render() {
    if(!this.mapScript) this.showMap()
    this.initMap = this.initMap.bind(this);
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
          <img alt="Drop positive alert" width="24px" height="24px" src={iconAlertGreen}/>
          <img alt="Drop neutral alert" width="24px" height="24px" src={iconAlertYellow}/>
          <img alt="Drop negative alert" width="24px" height="24px" src={iconAlertRed}/>
        </div>
        <div id="rightControls">
          <img alt="Drop positive announcement" width="24px" height="24px" src={iconAnnouncementGreen}/>
          <img alt="Drop neutral announcement" width="24px" height="24px" src={iconAnnouncementYellow}/>
          <img alt="Drop negative announcement" width="24px" height="24px" src={iconAnnouncementRed}/>
        </div>
      </div>
    );
  }
}

export default Map;
