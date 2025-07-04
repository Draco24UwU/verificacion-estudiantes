import { EnvironmentProviders } from '@angular/core';
import { provideRouter } from '@angular/router';
import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { DashboardComponent } from './pages/dashboard.component';

// * Configuración de rutas del módulo Home.
export const homeRoutes: Routes = [
  {
    path: '', // Ruta "/home"
    component: HomeComponent,
    children: [
      {
        path: 'test',
        component: DashboardComponent

      }
    ]
  },
  {
    path: 'dashboard', // Ruta completa: "/home/dashboard"
    component: DashboardComponent,
  },
];

// * Configuración del módulo Home.
export const homeConfig: EnvironmentProviders[] = [
  provideRouter(homeRoutes)
];
