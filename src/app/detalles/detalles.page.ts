import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

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
  IonCardSubtitle,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonButton,
  IonFab,
  IonFabButton,
  IonBadge,
  ActionSheetController,
  ToastController
} from '@ionic/angular';

import { addIcons } from 'ionicons';

import {
  cartOutline,
  checkmarkCircleOutline,
  carOutline,
  locationOutline,
  searchOutline,
  refreshOutline,
  closeOutline
} from 'ionicons/icons';

import { PRODUCTOS } from '../datos/productos';
import type { Producto } from '../datos/productos';

import { Carrito } from '../servicios/carrito';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.page.html',
  styleUrls: ['./detalles.page.scss'],
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
    IonCardSubtitle,
    IonCardContent,
    IonList,
    IonItem,
    IonLabel,
    IonIcon,
    IonButton,
    IonFab,
    IonFabButton,
    IonBadge
  ]
})
export class DetallesPage implements OnInit, OnDestroy {

  producto?: Producto;

  escala = 1;

  distanciaInicial = 0;
  escalaInicial = 1;

  temporizador: ReturnType<typeof setTimeout> | null = null;

  inicioX = 0;
  inicioY = 0;

  constructor(
    private route: ActivatedRoute,
    private actionSheetCtrl: ActionSheetController,
    private toastCtrl: ToastController,
    private cdr: ChangeDetectorRef,
    public readonly carrito: Carrito
  ) {

    addIcons({
      cartOutline,
      checkmarkCircleOutline,
      carOutline,
      locationOutline,
      searchOutline,
      refreshOutline,
      closeOutline
    });

  }

  // Buscar el producto seleccionado
  ngOnInit() {

    this.route.queryParamMap.subscribe(params => {

      const id = Number(params.get('id') ?? '1');

      this.producto = PRODUCTOS.find(p => p.id === id);

      this.escala = 1;

      console.log('ID recibido:', id);
      console.log('Producto encontrado:', this.producto);

      this.cdr.markForCheck();

    });

  }

  // NUEVO: Actualizar la interfaz al entrar
  ionViewWillEnter() {

    this.cdr.markForCheck();
    this.cdr.detectChanges();

  }

  // Calcular distancia entre dos dedos
  calcularDistancia(event: TouchEvent): number {

    const dedo1 = event.touches[0];
    const dedo2 = event.touches[1];

    return Math.hypot(
      dedo2.clientX - dedo1.clientX,
      dedo2.clientY - dedo1.clientY
    );

  }

  // Detectar inicio de un gesto
  iniciarToque(event: TouchEvent) {

    this.cancelarPresion();

    if (event.touches.length === 2) {

      this.distanciaInicial =
        this.calcularDistancia(event);

      this.escalaInicial = this.escala;

    }

    if (event.touches.length === 1) {

      this.inicioX = event.touches[0].clientX;
      this.inicioY = event.touches[0].clientY;

      this.temporizador = setTimeout(() => {

        this.temporizador = null;

        this.mostrarOpciones();

      }, 700);

    }

  }

  // Gesto Pinch/Zoom
  moverToque(event: TouchEvent) {

    if (
      event.touches.length === 2 &&
      this.distanciaInicial > 0
    ) {

      this.cancelarPresion();

      const distanciaActual =
        this.calcularDistancia(event);

      const nuevaEscala =
        this.escalaInicial *
        distanciaActual /
        this.distanciaInicial;

      this.escala = Math.min(
        3,
        Math.max(1, nuevaEscala)
      );

      this.cdr.markForCheck();

    } else if (event.touches.length === 1) {

      const movimiento = Math.hypot(
        event.touches[0].clientX - this.inicioX,
        event.touches[0].clientY - this.inicioY
      );

      if (movimiento > 10) {
        this.cancelarPresion();
      }

    }

  }

  finalizarToque() {

    this.cancelarPresion();

    this.distanciaInicial = 0;

  }

  cancelarPresion() {

    if (this.temporizador !== null) {

      clearTimeout(this.temporizador);

      this.temporizador = null;

    }

  }

  // Restablecer tamaño de imagen
  restablecerZoom() {

    this.escala = 1;

    this.cdr.markForCheck();

  }

  // Gesto Long-press
  async mostrarOpciones() {

    const menu = await this.actionSheetCtrl.create({

      header: this.producto?.nombre,

      buttons: [

        {
          text: 'Ampliar imagen',
          icon: 'search-outline',

          handler: () => {

            this.escala = Math.min(
              3,
              this.escala + 0.5
            );

            this.cdr.markForCheck();

          }
        },

        {
          text: 'Restablecer imagen',
          icon: 'refresh-outline',

          handler: () => {

            this.restablecerZoom();

          }
        },

        {
          text: 'Cancelar',
          icon: 'close-outline',
          role: 'cancel'
        }

      ]

    });

    await menu.present();

  }

  // MODIFICADO: Agregar producto al carrito
  async agregarAlCarrito() {

    if (!this.producto) {
      return;
    }

    // Agregar el producto al servicio
    this.carrito.agregar(this.producto);

    // Actualizar inmediatamente la interfaz
    this.cdr.markForCheck();
    this.cdr.detectChanges();

    // Consultar cantidad actual
    const cantidad = this.carrito.cantidadTotal();

    console.log('Cantidad actual del carrito:', cantidad);

    // Mostrar notificación de confirmación
    const mensaje = await this.toastCtrl.create({

      message:
        this.producto.nombre +
        ' agregado. Total: ' +
        cantidad + ' unidades.',

      duration: 1000,

      position: 'bottom',

      color: 'success',

      icon: 'checkmark-circle-outline'

    });

    await mensaje.present();

  }

  ngOnDestroy() {

    this.cancelarPresion();

  }

}