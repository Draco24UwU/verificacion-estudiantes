import { EnvironmentProviders } from '@angular/core';
import { provideRouter } from '@angular/router';
import { Routes } from '@angular/router';
import { AboutUseComponent } from './about-use.component';

// * Configuración de rutas del módulo Home.
export const aboutUseRoutes: Routes = [
  {
    path: '', // Ruta "/about-use"
    component: AboutUseComponent,
  },
];

// * Configuración del módulo Home.
export const aboutUseConfig: EnvironmentProviders[] = [
  provideRouter(aboutUseRoutes),
];
