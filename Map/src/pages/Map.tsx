import React, {Component} from 'react';
import './Map/Map.css';
import LegendControl from './Map/components/controls/LegendControl';
import Icons from './Map/icons';
import SettingsScreen from './Map/components/SettingsScreen';
import Features from 'pages/Map/classes/Features';
import Forms from './Map/objects/forms';

class Map extends Component {
  apiKey: string = "AIzaSyCmPlt5h88EltiYUh0SLMIMapHBhwDv_2M"
  markers: google.maps.Marker[] = [];
  location: google.maps.LatLngLiteral = {lat: 33.6580789, lng: -117.8358518}
  map: google.maps.Map;
  mapScript: any;

  //#region Google Maps init
  async initMap() {
    //import mapTypes
    let mapTypes: any = require('./Map/objects/mapTypes');
    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: this.location,
      mapTypeId: 'light',
      disableDefaultUI: true,
      zoomControl: true,
      fullscreenControl: false,
      scaleControl: true,
      mapTypeControlOptions: {
        mapTypeIds: ['light',  'dark']
      },
    });

    //set map center based on user location
    navigator.geolocation.getCurrentPosition((position) => {
      this.location = {lat: position.coords.latitude, lng: position.coords.longitude};
      this.map.setCenter(this.location);
    }, (err) => console.error(err));


    //load map types
    this.map.mapTypes.set('light',  mapTypes.warmMapType);
    this.map.mapTypes.set('dark', mapTypes.darkMapType);
    
    var legendControl: Element = document.getElementById('legendControl');
    this.map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(legendControl);

    var poweredBy: Element = document.getElementById('poweredBy');
    this.map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(poweredBy);
  }
    
  showMap() {
    window['initMap'] = this.initMap.bind(this);
    this.mapScript = document.createElement('script')
    this.mapScript.src = `https://maps.googleapis.com/maps/api/js?key=${this.apiKey}&callback=initMap`
    document.body.append(this.mapScript);
  }
  //#endregion Google Maps init
  
  changeTheme(theme: string) {
    this.map.setMapTypeId(theme);
    let root = document.documentElement;
    switch(theme) {
      default:
      case "light":
        root.style.setProperty('--background','var(--lighttheme-background)');
        root.style.setProperty('--text','var(--lighttheme-text)');
      break;
      /*
      case "dark":
        root.style.setProperty('--background','var(--darktheme-background)');
        root.style.setProperty('--text','var(--darktheme-text)');
      break;
      */
    }
  }

  pushMarker(features: Features) {
      //parse icon
      let icon;
      switch(features.type) {
        case "medicalUpdate": icon="handHoldingMedical"; break;
        case "localAnnouncement": icon="bullhorn"; break;
        case "localEvent": icon="calendarCheck"; break;
        case "askForHelp": icon="exclamationCircle"; break;
        default: icon="exclamationCircle"; break;
      }
      //parse form type
      let form;
      switch(features.type) {
        case "medicalUpdate": form="medicalUpdateForm"; break;
        case "localAnnouncement": form="localAnnouncementForm"; break;
        case "localEvent": form="localEventForm"; break;
        case "askForHelp": form="askForHelpForm"; break;
        default: form="askForHelpForm"; break;
      }
      //parse title
      let title;
      switch(features.type) {
        case "medicalUpdate": title="Medical Update"; break;
        case "localAnnouncement": title="Local Announcement"; break;
        case "localEvent": title="Local Event"; break;
        case "askForHelp": title="Request for Help"; break;
        default: title="Request for help"; break;
      }
      //create marker
      let marker = new google.maps.Marker({
        position: features.position,
        icon: Icons[icon],
        map: this.map,
        draggable: true
      });

      this.markers.push(marker)

      //create infoWindow
      var infowindow = new google.maps.InfoWindow({
        content: Forms[form],
        zIndex: 1000
      });
      //bring map into scope
      let map = marker.getMap();
      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });
      marker.setTitle(title)
      infowindow.open(map, marker);
  }

  dropIconOntoMap(type: string) {
    this.pushMarker(
      {
        position: this.location,
        type: type
      }
    );
  }

  render() {
    return (
      <div>
        <header>
          <a href="/">
            <img className="logo" alt="logo" src={`${process.env.PUBLIC_URL}/saddleback-church.png`}/>
            <strong>SADDLEBACK CHURCH</strong>
          </a>
          <img className="bars" src={Icons.bars} onClick={() => document.getElementById("settingsScreen").style.display = "flex"}/>
        </header>
        <div id="map"></div>
        <SettingsScreen mapComponent={this}/>
        <LegendControl mapComponent={this}/>
        <div id="poweredBy">
          Powered by NeighborXM
        </div>
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