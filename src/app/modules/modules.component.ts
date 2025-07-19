import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ModulesSidebarComponent } from './layout/modules.sidebar.component';
import { ModulesSidebarService } from './layout/services/modules.sidebar.service';
import { NgClass } from '@angular/common';
import { ModulesFooterComponent } from './layout/modules.footer.component';

@Component({
  selector: 'app-modules',
  imports: [
    RouterOutlet,
    ModulesSidebarComponent,
    ModulesFooterComponent,
    NgClass,
  ],
  template: `
    <ng-container>
      <header>
        <div
          class="fixed inset-0 -z-10 bg-cover bg-center"
          style="background-image: url('./img/bread-menu.avif'); opacity: 0.2;"
        ></div>
        <app-modules-sidebar />
      </header>
      <main
        [ngClass]="[
          _ModulesSidebarService.isExpandedClass,
          'transition-all duration-200 ease-in-out p-8',
        ]"
      >
        <router-outlet />
      </main>
      <footer
        [ngClass]="[
          _ModulesSidebarService.isExpandedClass,
          'transition-all duration-200 ease-in-out p-8',
        ]"
      >
        <app-modules-footer-component />
      </footer>
    </ng-container>
  `,
})
export class ModulesComponent {
  public readonly _ModulesSidebarService = inject(ModulesSidebarService);
}
