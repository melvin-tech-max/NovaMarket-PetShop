import { provideZoneChangeDetection } from '@angular/core';

import { bootstrapApplication } from '@angular/platform-browser';

import {
  RouteReuseStrategy,
  provideRouter,
  withComponentInputBinding,
  withPreloading,
  PreloadAllModules,
  withHashLocation
} from '@angular/router';

import {
  IonicRouteStrategy,
  provideIonicAngular
} from '@ionic/angular';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [

    // Detección de cambios mediante Zone.js
    provideZoneChangeDetection(),

    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },

    provideIonicAngular(),

    provideRouter(
      routes,
      withPreloading(PreloadAllModules),
      withComponentInputBinding(),
      withHashLocation()
    ),

  ],
});