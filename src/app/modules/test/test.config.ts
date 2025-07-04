import { EnvironmentProviders } from '@angular/core';
import { provideRouter } from '@angular/router';
import { Routes } from '@angular/router';
import { TestComponent } from './test';

// * Configuración de rutas del módulo Test.
export const testRoutes: Routes = [
  {
    path: '',
    component: TestComponent,
  },
];

// * Configuración del módulo Test.
export const testConfig: EnvironmentProviders[] = [provideRouter(testRoutes)];
