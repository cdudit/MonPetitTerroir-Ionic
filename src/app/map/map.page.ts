import { Component, OnInit } from '@angular/core';
import { Map, tileLayer, marker, circle, Circle, Marker } from 'leaflet';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { Router } from '@angular/router';
import { FirebaseService } from '../firebase.service';
import { Seller } from '../model/Seller';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  map: Map;
  marker: Marker;
  circle: Circle;
  lat: any;
  lng: any;
  km = 1;
  options: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };

  constructor(
    public geolocation: Geolocation,
    public router: Router,
    public firebase: FirebaseService,
    public nativeGeocoder: NativeGeocoder,
    public storage: Storage
  ) { }

  /**
   * Lors de l'initialisation de la page
   */
  ngOnInit() {
    // Récupération de la position
    this.geolocation.getCurrentPosition().then((resp: Geoposition) => {

      // Sauvegarde des coordonnées
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;

      // Affichage de la map
      this.map = new Map("map").setView([resp.coords.latitude, resp.coords.longitude], 10);
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data © <a href="https://www.openstreetmap.org/" > OpenStreetMap < /a> contributors,  <a href="https://creativecommons.org/licenses/by-sa/2.0/" > CC - BY - SA < /a>'
      }).addTo(this.map);

      // Affichage du marker avec la position
      this.marker = marker({ lat: resp.coords.latitude, lng: resp.coords.longitude }, {
        draggable: true
      }).on("dragend", (event) => {
        // Lorsqu'on bouge le marker, on récupère la position et on adapte le cercle
        let marker = event.target;
        this.lat = marker.getLatLng().lat
        this.lng = marker.getLatLng().lng
        this.displayCircle()
      }).addTo(this.map)

      // Récupération des producteurs stockés sur firebase
      this.firebase.getSellers().subscribe((sellers: Array<Seller>) => {
        sellers.forEach((seller: Seller) => {

          // Récupération des coordonnées pour chaque point de vente
          this.nativeGeocoder.forwardGeocode(seller.address + ' ' + seller.cp + ' ' + seller.city, this.options)
            .then((result: NativeGeocoderResult[]) => {

              // Création du marker et affichage des informations
              marker({ lat: Number(result[0].latitude), lng: Number(result[0].longitude) }, {
                draggable: false,
                title: String(seller.name),
              }).bindPopup(String(seller.name)).openPopup()
                .addTo(this.map);
            })
            .catch((error: any) => console.log(error));
        })
      })
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  /**
   * Affichage du cercle avec le radius
   */
  displayCircle() {
    // On supprime le dernier cercle
    if (this.circle != null) {
      this.map.removeLayer(this.circle);
    }

    // Affichage du nouveau avec nouveau radius
    this.circle = circle({ lat: this.lat, lng: this.lng }, {
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
    // Sauvegarde du nombre de kilomètres maximum
    this.km = event.target.value

    this.displayCircle()
  }

  /**
   * Clique pour valider
   */
  submit() {
    // Enregistrement des valeurs dans le local storage
    this.storage.set('userLatLng', { lat: this.lat, lng: this.lng });
    this.storage.set('maxKmAround', this.km);
    this.router.navigate(['/recipes']);
  }
}
