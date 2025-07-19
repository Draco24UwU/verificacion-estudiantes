import { EnvironmentProviders } from '@angular/core';
import { provideRouter } from '@angular/router';
import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';

// * Configuración de rutas del módulo Home.
export const homeRoutes: Routes = [
  {
    path: '', // Ruta "/home"
    component: HomeComponent,
  },
];

// * Configuración del módulo Home.
export const homeConfig: EnvironmentProviders[] = [provideRouter(homeRoutes)];
