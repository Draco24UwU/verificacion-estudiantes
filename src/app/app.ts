import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule],
  template: `
    <ng-container>
      <router-outlet />
    </ng-container>
  `,
})
export class App {
  protected title = 'AngularDesingPatterns';
}
