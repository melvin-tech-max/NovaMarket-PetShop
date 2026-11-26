import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonMenuButton,
  IonButton,
  IonIcon,
  IonCard,
  IonCardContent
} from '@ionic/angular';

import { addIcons } from 'ionicons';

import {
  pawOutline,
  cartOutline,
  gridOutline,
  carOutline,
  locationOutline,
  heartOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    RouterLink,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonMenuButton,
    IonButton,
    IonIcon,
    IonCard,
    IonCardContent
  ]
})

export class HomePage {

  constructor() {

    addIcons({
      pawOutline,
      cartOutline,
      gridOutline,
      carOutline,
      locationOutline,
      heartOutline
    });

  }

}