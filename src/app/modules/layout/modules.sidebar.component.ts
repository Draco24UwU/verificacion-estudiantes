import { Component, inject } from '@angular/core';
import { SidebarItem } from './types/modules.layout.types';
import { ModulesSidebarItemComponent } from './modules.sidebar.item.component';
import { ModulesSidebarService } from './services/modules.sidebar.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-modules-sidebar',
  imports: [ModulesSidebarItemComponent, NgClass],
  template: `
    <aside
      class="max-h-svh h-svh p-2 fixed bg-bread-800"
      [ngClass]="[
        _ModulesSidebarService.isExpanded ? 'w-50' : 'w-20',
        'transition-all duration-200 ease-in-out',
      ]"
    >
      <button
        (click)="_ModulesSidebarService.toogleSideBar()"
        class="w-full h-10 p-2 mb-8 flex justify-center cursor-pointer hover:scale-105 transition-all duration-200 ease-in-out gap-2 items-center"
        [ngClass]="_ModulesSidebarService.isExpanded ? 'w-fit' : 'w-full'"
      >
        <i class="fa-solid fa-bread-slice"></i>
        <i
          class="fa-solid fa-arrow-right"
          [ngClass]="
            _ModulesSidebarService.isExpanded
              ? 'fa-solid fa-arrow-left'
              : 'fa-solid fa-arrow-right'
          "
        ></i>
      </button>

      <nav>
        <ul class="w-full flex flex-col justify-center items-center gap-4">
          @for (item of MENU_CONFIG; track $index) {
            <app-modules-sidebar-item [item]="item" class="w-full" />
          }
        </ul>
      </nav>
    </aside>
  `,
})
export class ModulesSidebarComponent {
  public readonly _ModulesSidebarService = inject(ModulesSidebarService);

  public MENU_CONFIG: SidebarItem[] = [
    {
      type: 'Flat',
      label: 'Home',
      icon: 'fa-solid fa-house',
      route: 'home',
    },
    {
      type: 'Flat',
      label: 'Contact',
      icon: 'fa-solid fa-address-book',
      route: 'contact',
    },
    { type: 'Flat', label: 'Faq', icon: 'fa-solid fa-question', route: 'faq' },
    {
      type: 'Flat',
      label: 'About us',
      icon: 'fa-solid fa-address-card',
      route: 'about-us',
    },
  ];
}
