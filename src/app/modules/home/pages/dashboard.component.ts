import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../core/auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  template: `<p>Dashboard works! xd</p>`,
})
export class DashboardComponent implements OnInit {
  private readonly _authService = inject(AuthService);

  ngOnInit(): void {

  }
}
