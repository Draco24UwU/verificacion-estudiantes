import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth',
  imports: [RouterOutlet],
  template: ` <ng-container>
    <router-outlet />
  </ng-container>`,
})
export class AuthComponent {}
