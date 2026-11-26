import { Injectable, signal, computed } from '@angular/core';
import type { Producto } from '../datos/productos';

export interface ProductoCarrito extends Producto {
  cantidad: number;
}

@Injectable({
  providedIn: 'root'
})
export class Carrito {

  // Clave para guardar los productos en el navegador
  private readonly clave = 'novamarket_carrito';

  // Recuperar los productos guardados
  private items = signal<ProductoCarrito[]>(
    this.cargarCarrito()
  );

  productos = this.items.asReadonly();

  // Calcular cantidad total de productos
  cantidadTotal = computed(() =>
    this.items().reduce(
      (total, p) => total + p.cantidad, 0
    )
  );

  // Calcular precio total
  total = computed(() =>
    this.items().reduce(
      (total, p) => total + p.precio * p.cantidad, 0
    )
  );

  // NUEVO: Recuperar carrito guardado
  private cargarCarrito(): ProductoCarrito[] {

    try {

      const datos = localStorage.getItem(this.clave);

      if (datos) {

        const productos = JSON.parse(datos);

        return Array.isArray(productos) ? productos : [];

      }

      return [];

    } catch (error) {

      console.error('Error al recuperar carrito:', error);

      return [];

    }

  }

  // NUEVO: Guardar carrito en el navegador
  private guardarCarrito() {

    try {

      localStorage.setItem(
        this.clave,
        JSON.stringify(this.items())
      );

    } catch (error) {

      console.error('Error al guardar carrito:', error);

    }

  }

  // Agregar un producto
  agregar(producto: Producto) {

    const existente = this.items().find(
      p => p.id === producto.id
    );

    if (existente) {

      this.aumentar(producto.id);

    } else {

      this.items.update(lista => [
        ...lista,
        { ...producto, cantidad: 1 }
      ]);

      this.guardarCarrito();

    }

    console.log('Productos en carrito:', this.items());
    console.log('Cantidad total:', this.cantidadTotal());

  }

  // Aumentar cantidad
  aumentar(id: number) {

    this.items.update(lista =>
      lista.map(p =>
        p.id === id
          ? { ...p, cantidad: p.cantidad + 1 }
          : p
      )
    );

    this.guardarCarrito();

  }

  // Disminuir cantidad
  disminuir(id: number) {

    this.items.update(lista =>
      lista.map(p =>
        p.id === id
          ? {
              ...p,
              cantidad: Math.max(1, p.cantidad - 1)
            }
          : p
      )
    );

    this.guardarCarrito();

  }

  // Eliminar un producto
  eliminar(id: number) {

    this.items.update(lista =>
      lista.filter(p => p.id !== id)
    );

    this.guardarCarrito();

  }

  // Vaciar el carrito
  vaciar() {

    this.items.set([]);

    this.guardarCarrito();

  }

}