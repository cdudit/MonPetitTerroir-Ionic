import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements OnInit {

  constructor(
    public storage: Storage,
    public router: Router
  ) { }

  ngOnInit() {
    // On vérifie si l'utilisateur a déjà lancé l'app, si oui on le redirige
    this.storage.get('alreadyLaunched').then((val: boolean) => {
      if (val) {
        this.router.navigate(['/map']);
      }
    })
  }

  /**
   * Sauvegarde le fait que l'utilisateur a déjà vu la page d'accueil et redirection
   */
  startApp() {
    this.storage.set('alreadyLaunched', true);
    this.router.navigate(['/map']);
  }

}
