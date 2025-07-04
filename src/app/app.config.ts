import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { Routes } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/nora';
import { provideHttpClient } from '@angular/common/http';
import { definePreset } from '@primeng/themes';
import { authGuard } from './core/auth/guards/auth.guard';

// * Configuracion de rutas de la app.
// auth: rutas publicas.
// app: rutas privadas.
export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth'
  },
  {
    path: 'auth',
    loadChildren: () => import("./modules/auth/auth.config").then(m => m.authRoutes),
  },
  {
    path: 'app',
    loadChildren: () => import("./modules/modules.config").then(m => m.ModulesRoutes),
    canMatch: [authGuard]
  }
];

// * Configuracion del color principal
const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{slate.50}',
      100: '{slate.100}',
      200: '{slate.200}',
      300: '{slate.300}',
      400: '{slate.400}',
      500: '{slate.500}',
      600: '{slate.600}',
      700: '{slate.700}',
      800: '{slate.800}',
      900: '{slate.900}',
      950: '{slate.950}',
    },
  },
});

// * Configuracion general de la app.
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({
      ripple: true,
      theme: {
        preset: MyPreset,
        options: {
          cssLayer: {
            darkModeSelector: false, // Explicitly disable dark mode
            name: 'primeng',
            order: 'tailwind, primeng',
          },
          colorScheme: 'light', // Explicitly set light mode
        },
      },
    }),
  ],
};
