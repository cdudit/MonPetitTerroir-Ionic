import { Component, AfterViewInit, ElementRef, Renderer2, Input } from '@angular/core';
import { GestureController, GestureConfig, Gesture } from '@ionic/angular';

@Component({
  selector: 'app-bottom-sheet-map',
  templateUrl: './bottom-sheet-map.component.html',
  styleUrls: ['./bottom-sheet-map.component.scss'],
})
export class BottomSheetMapComponent implements AfterViewInit {
  state = 'bottom';
  handleHeight = 200;

  constructor(
    private gestureCtrl: GestureController,
    private element: ElementRef,
    private renderer: Renderer2
  ) { }

  async ngAfterViewInit() {
    // Récupération de la taille de l'écran
    const windowHeight = window.innerHeight;
    const drawerHeight = windowHeight - this.handleHeight;
    this.renderer.setStyle(this.element.nativeElement, 'top', windowHeight - this.handleHeight + 'px');

    // Options pour la configuration
    const options: GestureConfig = {
      el: document.querySelector('#header'), // L'en-tête est l'élément sur lequel on se base
      direction: 'y', // Axe des y
      gestureName: 'slide-drawer-swipe', // Correspond à un slide
      onStart: () => {
        this.renderer.setStyle(this.element.nativeElement, 'transition', 'none');
      },
      onMove: (ev) => {
        if (ev.deltaY < 0 && this.state === 'bottom') {
          this.renderer.setStyle(this.element.nativeElement, 'transform', `translateY(${ev.deltaY}px)`);

        } else if (this.state === 'top') {
          // Si on est en haut et que le deltaY est négatif, l'utilisateur slide vers le bas
          this.renderer.setStyle(this.element.nativeElement, 'transform', `translateY(calc(${ev.deltaY}px - ${drawerHeight}px))`);
        }
      },
      onEnd: (ev) => {
        this.renderer.setStyle(this.element.nativeElement, 'transition', '0.3s ease-out');
        if (ev.deltaY < -(windowHeight / 20) && this.state === 'bottom') {
          this.renderer.setStyle(this.element.nativeElement, 'transform', `translateY(-${drawerHeight}px)`);
          this.state = 'top';
        } else if (ev.deltaY < (windowHeight / 20) && this.state === 'top') {
          this.renderer.setStyle(this.element.nativeElement, 'transform', `translateY(-${drawerHeight}px)`);
          this.state = 'top';
        } else if (ev.deltaY > (windowHeight / 20) && this.state === 'top') {
          this.renderer.setStyle(this.element.nativeElement, 'transform', 'translateY(0px)');
          this.state = 'bottom';
        } else {
          this.renderer.setStyle(this.element.nativeElement, 'transform', 'translateY(0px)');
          this.state = 'bottom';
        }
      }
    };
    const gesture: Gesture = this.gestureCtrl.create(options);
    gesture.enable();
  }

}
