import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-modules-footer-component',
  imports: [RouterLink],
  template: `
    <div
      class="w-full bg-bread-800 rounded-lg shadow-sm  p-4 md:flex md:items-center md:justify-between"
    >
      <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
        © 2025
        <a class="hover:underline">Kiara™</a>
      </span>
      <ul
        class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0"
      >
        <li>
          <a [routerLink]="['home']" class="hover:underline me-4 md:me-6">
            Home
          </a>
        </li>
        <li>
          <a [routerLink]="['contact']" class="hover:underline me-4 md:me-6">
            Contact
          </a>
        </li>
        <li>
          <a
            [routerLink]="['faq']"
            routerLinkActive="router-link-active"
            class="hover:underline me-4 md:me-6"
          >
            Faq
          </a>
        </li>
        <li>
          <a [routerLink]="['about-us']" class="hover:underline">About us</a>
        </li>
      </ul>
    </div>
  `,
})
export class ModulesFooterComponent {}
