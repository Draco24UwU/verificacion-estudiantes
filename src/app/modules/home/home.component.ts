import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterModule],
  template: ` <ng-container>
    <section>
      <router-outlet />
    </section>
  </ng-container>`,
})
export class HomeComponent {}
