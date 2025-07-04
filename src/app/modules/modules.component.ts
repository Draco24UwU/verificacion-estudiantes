import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-modules',
  template: `
  <section>
    <h1 class="text-white">Estas en los modulos</h1>
    <router-outlet></router-outlet>
  </section>`,
  imports: [RouterOutlet]
})
export class ModulesComponent {}
