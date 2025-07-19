import { Component, inject, input } from '@angular/core';
import { SidebarItem } from './types/modules.layout.types';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { NgClass } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';
import { ModulesSidebarService } from './services/modules.sidebar.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';

@Component({
  selector: 'app-modules-sidebar-item',
  imports: [RouterModule, ButtonModule, NgClass, TooltipModule],
  template: `
    <li
      (click)="_ModulesSidebarService.currentSideBarItem = item"
      (keydown)="_ModulesSidebarService.currentSideBarItem = item"
      tabindex="0"
    >
      @if (item.type === 'Flat') {
        <button
          pButton
          (click)="goToRoute(item.route)"
          [pTooltip]="_ModulesSidebarService.isExpanded ? '' : item.label"
          [ngClass]="[
            this.currentRouteName === item.route
              ? 'bg-bread-900! '
              : 'bg-bread-600! hover:bg-bread-500!',
          ]"
          class="w-full border-bread-100!  transition-all! duration-200! ease-in-out!"
        >
          @if (_ModulesSidebarService.isExpanded) {
            <span class="flex items-center justify-center gap-2">
              <p class="text-bread-100">{{ item.label }}</p>
              <i [ngClass]="[item.icon, 'text-bread-100']"></i>
            </span>
          } @else {
            <i [ngClass]="[item.icon, 'text-bread-100']"></i>
          }
        </button>
      }
    </li>
  `,
})
export class ModulesSidebarItemComponent {
  private readonly _router = inject(Router);
  public readonly _ModulesSidebarService = inject(ModulesSidebarService);

  private $routeParams = toSignal(this._router.events);
  public $item = input.required<SidebarItem>({ alias: 'item' });
  public currentRouteName = '';

  constructor() {
    const routeParams = this._router.url.split('/');
    this.currentRouteName = routeParams[routeParams.length - 1];

    this._router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const routeParams = event.urlAfterRedirects.split('/');
        this.currentRouteName = routeParams[routeParams.length - 1];
      });
  }

  public goToRoute(route: string) {
    console.log(route);
    this._router.navigate(['/app', route]);
  }

  public get item() {
    return this.$item();
  }
  public get routeParams() {
    return this.$routeParams();
  }
}
