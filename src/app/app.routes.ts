import type { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
{
  path: '',
  redirectTo: 'home',
  pathMatch: 'full'
},
  {
    path: 'catalogo',
    loadComponent: () => import('./catalogo/catalogo.page').then((m) => m.CatalogoPage),
  },
  {
    path: 'detalles',
    loadComponent: () => import('./detalles/detalles.page').then((m) => m.DetallesPage),
  },
  {
    path: 'carrito',
    loadComponent: () => import('./carrito/carrito.page').then((m) => m.CarritoPage),
  },
];