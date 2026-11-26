import {
  Component,
  inject,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonItem,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonThumbnail,
  IonLabel,
  IonButton,
  IonIcon,
  IonFab,
  IonFabButton,
  ToastController
} from '@ionic/angular';

import { addIcons } from 'ionicons';

import {
  cartOutline,
  addOutline,
  removeOutline,
  trashOutline,
  bagHandleOutline,
  arrowBackOutline
} from 'ionicons/icons';

import { Carrito } from '../servicios/carrito';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonBackButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonList,
    IonItem,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonThumbnail,
    IonLabel,
    IonButton,
    IonIcon,
    IonFab,
    IonFabButton
  ]
})
export class CarritoPage {

  public readonly carrito = inject(Carrito);

  private readonly toastCtrl = inject(ToastController);

  // NUEVO: Detector de cambios
  private readonly cdr = inject(ChangeDetectorRef);

  constructor() {

    addIcons({
      cartOutline,
      addOutline,
      removeOutline,
      trashOutline,
      bagHandleOutline,
      arrowBackOutline
    });

  }

  // NUEVO: Actualizar al entrar al carrito
  ionViewWillEnter() {

    this.actualizarPantalla();

  }

  // NUEVO: Actualizar después de la navegación
  ionViewDidEnter() {

    this.actualizarPantalla();

  }

  // NUEVO: Actualizar la interfaz
  private actualizarPantalla() {

    this.cdr.markForCheck();
    this.cdr.detectChanges();

    console.log(
      'Cantidad del carrito:',
      this.carrito.cantidadTotal()
    );

    console.log(
      'Total del pedido:',
      this.carrito.total()
    );

  }

  // Aumentar cantidad
  aumentar(id: number) {

    this.carrito.aumentar(id);

    this.actualizarPantalla();

  }

  // Disminuir cantidad
  disminuir(id: number) {

    this.carrito.disminuir(id);

    this.actualizarPantalla();

  }

  // Eliminar mediante Swipe
  async eliminar(id: number) {

    this.carrito.eliminar(id);

    this.actualizarPantalla();

    const mensaje = await this.toastCtrl.create({

      message: 'Producto eliminado del carrito.',
      duration: 1500,
      color: 'danger',
      position: 'bottom'

    });

    await mensaje.present();

  }

  // Simulación de finalización del pedido
  async finalizarPedido() {

    this.actualizarPantalla();

    const mensaje = await this.toastCtrl.create({

      message: 'Simulación de pedido completada.',
      duration: 2500,
      color: 'success',
      position: 'bottom'

    });

    await mensaje.present();

  }

}