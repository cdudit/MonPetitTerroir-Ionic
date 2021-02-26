import { Component, OnInit } from '@angular/core';
import { Map, tileLayer, marker } from 'leaflet';
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
  selectedSeller: Seller = null;

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
    // Affichage de l'alerte
    this.presentLoading();

    // Récupération du point de vente sélectionné s'il existe
    this.storage.get('seller').then((value: Seller) => {
      if (value) {
        this.selectedSeller = value;
      }
    });

    // Récupération de la position
    this.geolocation.getCurrentPosition().then((resp: Geoposition) => {

      // Affichage de la map
      this.map = new Map('map').setView([resp.coords.latitude, resp.coords.longitude], 10);
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data © <a href="https://www.openstreetmap.org/" > OpenStreetMap < /a> contributors,  <a href="https://creativecommons.org/licenses/by-sa/2.0/" > CC - BY - SA < /a>'
      }).bindPopup('Vous êtes ici').openPopup()
        .addTo(this.map);

      // Affichage du marker avec la position
      marker({ lat: resp.coords.latitude, lng: resp.coords.longitude })
        .addTo(this.map)
        .bindPopup('Vous êtes ici').openPopup();

      // Récupération des producteurs stockés sur firebase
      this.firebase.getSellers().subscribe((sellers: Array<Seller>) => {
        sellers.forEach((seller: Seller) => {

          // Affichage d'un marker par point de vente
          marker({ lat: seller.geoloc.latitude, lng: seller.geoloc.longitude })
            .addTo(this.map)
            .bindTooltip(String(seller.name))
            .on('click', () => {
              // Récupération du point de vente sélectionné
              this.selectedSeller = seller;
            });
        });
      });

      // On enlève l'alerte puisque la map est chargée
      this.alertController.dismiss();

    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  /**
   * Clique pour valider
   */
  submit() {
    // Vérification afin de s'assurer que l'utilisateur a bien sélectionné un point de vente
    if (this.selectedSeller == null) {
      this.presentAlert();
    } else {
      // Enregistrement des valeurs dans le local storage et redirection
      this.storage.set('seller', this.selectedSeller);
      this.router.navigate(['/recipes']);
    }
  }

  /**
   * Affichage de l'alerte pour sélectionner un point de vnete
   */
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Attention',
      message: 'Veuillez sélectionner un point de vente',
      buttons: ['OK']
    });

    await alert.present();
  }

  /**
   * Affichage de l'alerte pour le chargement
   */
  async presentLoading() {
    const alert = await this.alertController.create({
      header: 'Chargement de la carte, veuillez patienter',
      message: '<ion-spinner></ion-spinner>',
    });

    await alert.present();
  }
}
