import { Component, OnInit } from '@angular/core';
import { Map, tileLayer, marker, circle, Circle, Marker } from 'leaflet';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { Router } from '@angular/router';
import { FirebaseService } from '../firebase.service';
import { Seller } from '../model/Seller';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  map: Map;

  constructor(
    public geolocation: Geolocation,
    public router: Router,
    public firebase: FirebaseService,
    public storage: Storage,
    public alertController: AlertController
  ) { }

  /**
   * Lors de l'initialisation de la page
   */
  ngOnInit() {
    this.presentAlert()

    // Récupération de la position
    this.geolocation.getCurrentPosition().then((resp: Geoposition) => {
      // Affichage de la map
      this.map = new Map("map").setView([resp.coords.latitude, resp.coords.longitude], 10);
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data © <a href="https://www.openstreetmap.org/" > OpenStreetMap < /a> contributors,  <a href="https://creativecommons.org/licenses/by-sa/2.0/" > CC - BY - SA < /a>'
      }).bindPopup('Vous êtes ici').openPopup()
        .addTo(this.map);

      // Affichage du marker avec la position
      marker({ lat: resp.coords.latitude, lng: resp.coords.longitude })
        .addTo(this.map)

      // Récupération des producteurs stockés sur firebase
      this.firebase.getSellers().subscribe((sellers: Array<Seller>) => {
        sellers.forEach((seller: Seller) => {

          // Affichage d'un marker par point de vente
          marker({ lat: seller.geoloc.latitude, lng: seller.geoloc.longitude })
            .bindPopup(String(seller.name)).openPopup()
            .addTo(this.map)
            .on('click', function (e) {
              console.log(this);
            });
        })
      })

      this.alertController.dismiss()
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  /**
   * Clique pour valider
   */
  submit() {
    // Enregistrement des valeurs dans le local storage
    this.storage.set('seller', '');
    this.router.navigate(['/recipes']);
  }

  /**
   * Affichage de l'alerte pour le chargement
   */
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Affichage de la carte, veuillez patienter',
      message: '<ion-spinner></ion-spinner>',
    });

    await alert.present();
  }
}
