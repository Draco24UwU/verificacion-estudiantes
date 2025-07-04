import { EnvironmentProviders } from '@angular/core';
import { provideRouter } from '@angular/router';
import { Routes } from '@angular/router';
import { ModulesComponent } from './modules.component';

// * Configuración de rutas del módulo Test.
export const ModulesRoutes: Routes = [
  {
    path: '',
    component: ModulesComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
      },
      {
        path: 'home',
        loadChildren: () => import("./home/home.config").then((m) => m.homeRoutes)
      },
      {
        path: 'test',
        loadChildren: () => import("./test/test.config").then((m) => m.testRoutes)
      }
    ]
  },
];

// * Configuración del módulo Test.
export const ModulesConfig: EnvironmentProviders[] = [provideRouter(ModulesRoutes)];
