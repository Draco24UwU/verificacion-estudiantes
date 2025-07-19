import { EnvironmentProviders } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './pages/login.component';

// * Configuración de rutas del módulo Auth.
export const authRoutes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login',
      },
      {
        path: 'login',
        component: LoginComponent,
      },
    ],
  },
];

// * Configuración del módulo Auth.
export const homeConfig: EnvironmentProviders[] = [provideRouter(authRoutes)];
