import { inject, Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { QrTokenService } from '../../../modules/login/services/qr-generator.service';

@Injectable({
  providedIn: 'root',
})
export class QrAccessGuard implements CanActivate {
  private readonly token = inject(QrTokenService);
  private readonly router = inject(Router);

  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    const tokenFromQuery = route.queryParamMap.get('token');

    if (!tokenFromQuery) {
      console.warn('No token provided');
      this.router.navigate(['/login', 'qr-generator']);
      return false;
    }

    try {
      const isValid = await this.token.validateToken(tokenFromQuery);

      if (!isValid) {
        console.warn('Invalid token:', tokenFromQuery);
        this.router.navigate(['/login', 'qr-generator']);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Validation error:', error);
      this.router.navigate(['/login', 'qr-generator']);
      return false;
    }
  }
}
