import { EnvironmentProviders } from '@angular/core';
import { provideRouter } from '@angular/router';
import { Routes } from '@angular/router';
import { ContactComponent } from './contact.component';

// * Configuración de rutas del módulo Home.
export const contactRoutes: Routes = [
  {
    path: '', // Ruta "/contact"
    component: ContactComponent,
  },
];

// * Configuración del módulo Home.
export const contactConfig: EnvironmentProviders[] = [
  provideRouter(contactRoutes),
];
