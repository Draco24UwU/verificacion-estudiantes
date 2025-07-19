import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { Routes } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { provideHttpClient } from '@angular/common/http';
import { definePreset } from '@primeng/themes';

// * Configuracion de rutas de la app.
// auth: rutas publicas.
// app: rutas privadas.
// Guard de la app --> canMatch: [authGuard],
export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'app',
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.config').then(m => m.authRoutes),
  },
  {
    path: 'app',
    loadChildren: () =>
      import('./modules/modules.config').then(m => m.ModulesRoutes),
  },
];

// * Configuracion del color principal
const customPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: 'var(--color-bread-50)',
      100: 'var(--color-bread-100)',
      200: 'var(--color-bread-200)',
      300: 'var(--color-bread-300)',
      400: 'var(--color-bread-400)',
      500: 'var(--color-bread-500)',
      600: 'var(--color-bread-600)',
      700: 'var(--color-bread-700)',
      800: 'var(--color-bread-800)',
      900: 'var(--color-bread-900)',
      950: 'var(--color-bread-950)',
    },
    colorScheme: {
      light: {
        surface: {
          0: '#ffffff',
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#eeeeee',
          300: '#e0e0e0',
          400: '#bdbdbd',
          500: '#9e9e9e',
          600: '#757575',
          700: '#616161',
          800: '#424242',
          900: '#212121',
          950: '#0a0a0a',
        },
        primary: {
          color: 'var(--color-bread-600)',
          inverseColor: '#ffffff',
          hoverColor: 'var(--color-bread-700)',
          activeColor: 'var(--color-bread-800)',
        },
        highlight: {
          background: 'var(--color-bread-50)',
          focusBackground: 'var(--color-bread-100)',
          color: 'var(--color-bread-700)',
          focusColor: 'var(--color-bread-800)',
        },
      },
      dark: {
        surface: {
          0: 'var(--color-bread-0)',
          50: 'var(--color-bread-50)',
          100: 'var(--color-bread-100)',
          200: 'var(--color-bread-200)',
          300: 'var(--color-bread-300)',
          400: 'var(--color-bread-400)',
          500: 'var(--color-bread-500)',
          600: 'var(--color-bread-600)',
          700: 'var(--color-bread-700)',
          800: 'var(--color-bread-800)',
          900: 'var(--color-bread-900)',
          950: 'var(--color-bread-950)',
        },
        primary: {
          color: 'var(--color-bread-300)',
          inverseColor: 'var(--color-bread-900)',
          hoverColor: 'var(--color-bread-200)',
          activeColor: 'var(--color-bread-100)',
        },
        highlight: {
          background: 'var(--color-bread-800)',
          focusBackground: 'var(--color-bread-700)',
          color: 'var(--color-bread-100)',
          focusColor: 'var(--color-bread-50)',
        },
      },
    },
  },
  css: {
    variables: {
      light: {
        '--primary-color': 'var(--color-bread-600)',
        '--primary-color-text': '#ffffff',
        '--surface-a': '#ffffff',
        '--surface-b': '#fafafa',
        '--surface-c': '#f5f5f5',
        '--surface-d': '#eeeeee',
        '--surface-e': '#ffffff',
        '--surface-f': '#ffffff',
      },
      dark: {
        '--primary-color': 'var(--color-bread-300)',
        '--primary-color-text': 'var(--color-bread-900)',
        '--surface-a': '#0a0a0a',
        '--surface-b': '#212121',
        '--surface-c': '#424242',
        '--surface-d': '#616161',
        '--surface-e': '#0a0a0a',
        '--surface-f': '#0a0a0a',
      },
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
        preset: customPreset,
        options: {
          cssLayer: {
            name: 'primeng',
            order: 'theme, base, primeng',
          },
        },
      },
    }),
  ],
};
