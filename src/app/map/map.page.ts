import { Component, OnInit } from '@angular/core';
import { Map, tileLayer, marker, circle } from 'leaflet';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  map: Map;
  newMarker: any;
  address: string[];

  constructor(public geolocation: Geolocation) { }

  ngOnInit() {
    this.geolocation.getCurrentPosition().then((resp: Geoposition) => {
      this.map = new Map("map").setView([resp.coords.latitude, resp.coords.longitude], 15);
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          attribution: 'Map data © <a href="https://www.openstreetmap.org/" > OpenStreetMap < /a> contributors,  <a href="https://creativecommons.org/licenses/by-sa/2.0/" > CC - BY - SA < /a>'
        })
        .addTo(this.map);
      circle({ lat: resp.coords.latitude, lng: resp.coords.longitude }, {
        color: 'steelblue',
        radius: 500,
        fillColor: 'steelblue',
        opacity: 0.5
      }).addTo(this.map)
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

}
