import React, {Component, createRef} from 'react';
import './App.css';

class Map extends Component {
  map;
  mapScript

  initMap() {
    let map = new window.google.maps.Map(document.getElementById('map'), {
      zoom: 16,
      center: new window.google.maps.LatLng(-33.91722, 151.23064),
      mapTypeId: 'roadmap',
      styles: {
        featureType: 'poi',
        stylers: [{visibility: 'off'}]
      },
      disableDefaultUI: true,
      zoomControl: true,
      fullscreenControl: true,
      scaleControl: true
    });

    var icons = {
      broadcast: {
        name: 'Broadcasting',
        icon: process.env.PUBLIC_URL+'/icons/record_voice_over-24px.svg'
      },
      silent: {
        name: 'Silent',
        icon: process.env.PUBLIC_URL+'/icons/voice_over_off-24px.svg'
      }
    };

    var features = [
      {
        position: new window.google.maps.LatLng(-33.91721, 151.22630),
        type: 'broadcast'
      },
      {
        position: new window.google.maps.LatLng(-33.91721, 151.22755),
        type: 'silent'
      }
    ];

    // Create markers.
    features.forEach(function(feature) {
      var marker = new window.google.maps.Marker({
        position: feature.position,
        icon: icons[feature.type].icon,
        map: map
      });
    });

    var legend = document.getElementById('legend');
    for (var key in icons) {
      var type = icons[key];
      var name = type.name;
      var icon = type.icon;
      var div = document.createElement('div');
      div.innerHTML = '<img src="' + icon + '"> ' + name;
      legend.appendChild(div);
    }

    map.controls[window.google.maps.ControlPosition.RIGHT_BOTTOM].push(legend);

    var controls = document.getElementById('controls');
    map.controls[window.google.maps.ControlPosition.BOTTOM_CENTER].push(controls);
  }

  showMap() {
    window.initMap = this.initMap.bind(this);
    this.mapScript = document.createElement('script')
    this.mapScript.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBE6XOeqFdxBYne49mBI-_4lypZQam_HO4&callback=initMap'
    document.body.append(this.mapScript);
  }

  render() {
    if(!this.mapScript) this.showMap()
    return <div>
      <div id="legend"><h3>Legend</h3></div>
    </div>
  }
}

export default Map;
