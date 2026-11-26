import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import {
  IonApp,
  IonRouterOutlet,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonMenuToggle
} from '@ionic/angular';

import { addIcons } from 'ionicons';

import {
  pawOutline,
  homeOutline,
  gridOutline,
  cartOutline,
  locationOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [
    RouterLink,
    IonApp,
    IonRouterOutlet,
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonIcon,
    IonMenuToggle
  ]
})

export class AppComponent {

  constructor() {

    addIcons({
      pawOutline,
      homeOutline,
      gridOutline,
      cartOutline,
      locationOutline
    });

  }

}