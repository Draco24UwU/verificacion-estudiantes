import { EnvironmentProviders } from '@angular/core';
import { provideRouter } from '@angular/router';
import { Routes } from '@angular/router';
import { FaqComponent } from './faq.component';

// * Configuración de rutas del módulo Home.
export const faqRoutes: Routes = [
  {
    path: '', // Ruta "/faq"
    component: FaqComponent,
  },
];

// * Configuración del módulo Home.
export const faqConfig: EnvironmentProviders[] = [provideRouter(faqRoutes)];
