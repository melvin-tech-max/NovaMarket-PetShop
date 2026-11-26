import {
  Component,
  ChangeDetectorRef,
  inject
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
  IonRefresher,
  IonRefresherContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonBadge,
  IonButtons,
  IonMenuButton
} from '@ionic/angular';

import { addIcons } from 'ionicons';

import {
  cartOutline,
  pawOutline,
  chevronDownCircleOutline
} from 'ionicons/icons';

import { PRODUCTOS } from '../datos/productos';
import { Carrito } from '../servicios/carrito';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.page.html',
  styleUrls: ['./catalogo.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonButton,
    IonRefresher,
    IonRefresherContent,
    IonFab,
    IonFabButton,
    IonIcon,
    IonBadge,
    IonButtons,
    IonMenuButton
  ]
})
export class CatalogoPage {

  // Servicio compartido del carrito
  public readonly carrito = inject(Carrito);

  ultimaActualizacion = 'Productos disponibles';

  productos = PRODUCTOS;

  constructor(private cdr: ChangeDetectorRef) {

    addIcons({
      cartOutline,
      pawOutline,
      chevronDownCircleOutline
    });

  }

  // Actualizar la pantalla al regresar al catálogo
  ionViewWillEnter() {

    this.cdr.markForCheck();
    this.cdr.detectChanges();

  }

  // Gesto Pull-to-refresh
  refrescar(event: any) {

    console.log('Gesto Pull-to-refresh iniciado');

    this.ultimaActualizacion =
      'Actualizando catálogo...';

    this.cdr.markForCheck();

    setTimeout(() => {

      this.productos = [...PRODUCTOS];

      this.ultimaActualizacion =
        'Actualizado: ' + new Date().toLocaleTimeString();

      this.cdr.markForCheck();

      event.target.complete();

      console.log('Catálogo actualizado correctamente');

    }, 1500);

  }

}