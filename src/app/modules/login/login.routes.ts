import { Routes } from '@angular/router';
import { QrGenerator } from './components/qr-generator.component';
import { TakePhoto } from './components/take-photo.component';

// * Configuración de rutas del módulo Test.
export const LoginRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'qr-generator',
  },
  {
    path: 'qr-generator',
    component: QrGenerator,
  },
  {
    path: 'take-photo',
    component: TakePhoto,
  },
];
