import { Component, OnInit } from '@angular/core';
import { Map, tileLayer, marker, circle, Circle, Marker } from 'leaflet';
import { Coordinates, Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  map: Map;
  marker: Marker;
  circle: Circle;
  coords: Coordinates;
  km: any = 1;

  constructor(public geolocation: Geolocation, public router: Router) { }

  /**
   * Lors de l'initialisation de la page
   */
  ngOnInit() {
    // Récupération de la position
    this.geolocation.getCurrentPosition().then((resp: Geoposition) => {

      // Sauvegarde des coordonnées
      this.coords = resp.coords;

      // Affichage de la map
      this.map = new Map("map").setView([resp.coords.latitude, resp.coords.longitude], 10);
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          attribution: 'Map data © <a href="https://www.openstreetmap.org/" > OpenStreetMap < /a> contributors,  <a href="https://creativecommons.org/licenses/by-sa/2.0/" > CC - BY - SA < /a>'
        })
        .addTo(this.map);

      // Affichage du marker avec la position
      this.marker = marker({ lat: resp.coords.latitude, lng: resp.coords.longitude }, {
        draggable: true
      }).bindPopup("You are located here!").openPopup()
        .on("dragend", () => {
          this.displayCircle(this.marker.getLatLng().lat, this.marker.getLatLng().lng)
        })
        .addTo(this.map)

      // Affichage du cercle représentant la zone de déplacement maximale
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  displayCircle(current_lat, current_lng) {
    // On supprime le dernier cercle
    this.map.removeLayer(this.circle);

    // Affichage du nouveau avec nouveau radius
    this.circle = circle({ lat: current_lat, lng: current_lng }, {
      color: 'steelblue',
      radius: this.km * 1000,
      fillColor: 'steelblue',
      opacity: 0.5
    }).addTo(this.map)
  }

  /**
   * Lors du changement sur le slide
   * @param event 
   */
  onChange(event) {
    // Affichage du nouveau avec nouveau radius
    this.displayCircle(this.coords.latitude, this.coords.longitude)

    // Sauvegarde du nombre de kilomètres maximum
    this.km = event.target.value
  }

  /**
   * Clique pour valider
   */
  submit() {
    // TODO : local storage
    this.router.navigate(['/tabs/tab1']);
  }

}
